#!/usr/bin/env bash
# =============================================================================
# learn_from_failure.sh [JOBID]
#   Analyze one of YOUR failed Gilbreth jobs and propose a GOTCHAS.md entry.
#
#   READ-ONLY. Inspects only your own jobs. NEVER touches /depot/jmansson.
#
#   Run on a Gilbreth front-end:
#       ./learn_from_failure.sh 1234567
#       ./learn_from_failure.sh                 # auto-picks your most recent FAILED job
#
#   Or run from your laptop through ssh:
#       ssh gil 'bash -s' -- < bin/learn_from_failure.sh 1234567
#
#   After reviewing the output, append the proposed "## G??" block to GOTCHAS.md.
# =============================================================================
set -euo pipefail

JOBID="${1:-}"
if [ -z "${JOBID:-}" ]; then
  JOBID=$(sacct -X --starttime=2025-01-01 --format=JobID,State -n 2>/dev/null \
          | awk '$2=="FAILED"{print $1; exit}')
  if [ -z "${JOBID:-}" ]; then
    echo "No FAILED job found in your history."; exit 1
  fi
  echo "# auto-selected your most recent FAILED job: $JOBID"
fi

# ---- single-field sacct reads (robust; no whitespace parsing) ----
fld() { sacct -j "$JOBID" -X --format="$1" -n 2>/dev/null | head -1 | sed 's/^ *//;s/ *$//'; }
NAME=$(fld JobName); STATE=$(fld State); EC=$(fld ExitCode); REASON=$(fld Reason)
OUT=$(fld StdOut)

echo "==================== FAILURE ANALYSIS — job $JOBID ===================="
echo "name='$NAME'  state='$STATE'  exit='$EC'  reason='$REASON'"
echo "stdout-path='$OUT'"

case "$EC" in
  1:0)   echo "→ likely app error (exit 1): import/env/path (G10) or module load order (G1)";;
  2:0)   echo "→ exit 2: misuse / bad args (G10)";;
  127:0) echo "→ command not found (G10): binary not on PATH / env not activated";;
  134:0) echo "→ SIGABRT (G8-ish): assertion / abort, often a C++/CUDA fault";;
  135:0) echo "→ SIGBUS (G8): often full scratch/tmp during checkpoint or mmap";;
  137:0) echo "→ SIGKILL: likely OOM or preemption (set --mem, checkpoint — G8)";;
  139:0) echo "→ SIGSEGV: segfault — version/ABI mismatch (e.g. torch×cuda, G6)";;
  *)     echo "→ (see PREFLIGHT.md exit-code decoder)";;
esac

# ---- tail the actual log, skipping jmansson (hard boundary) ----
if [ -n "$OUT" ] && [ "$OUT" != "None" ]; then
  case "$OUT" in
    *jmansson*) echo "(log lives under /depot/jmansson — SKIPPING per hard boundary)";;
    *)
      # StdOut may store an unresolved Slurm pattern like /home/%u/logs/%x-%j — try to resolve
      f="$OUT"; [ -f "$f" ] || f="${OUT%+}"           # drop a trailing '+'
      [ -f "$f" ] || f=$(ls "${OUT##*/}" 2>/dev/null | head -1)
      if [ -n "$f" ] && [ -f "$f" ]; then
        echo "----- last 20 lines of $f -----"
        tail -n 20 "$f" 2>/dev/null | grep -vaE "it/s\]|Capturing CUDA|Processed prompts|Adding requests"
      else
        echo "(log not found at '$OUT' — check your \$HOME/logs or --output pattern)"
      fi
      ;;
  esac
else
  echo "(no StdOut path recorded — the job may not have set --output, or used #SBATCH --output)"
fi

cat <<EOF

==================== PROPOSED GOTCHA — review, then append to GOTCHAS.md ====================
## G?? — <one-line symptom>  [LOG]
**Symptom:** <what you saw — e.g. job exits with code $EC, "$REASON">
**Cause:** <root cause read from the log above>
**Fix:** <the exact module/env/flag change that resolves it>
**Detect:** <grep pattern or sacct signature, e.g. 'grep -i "<token>" <log>' ; ExitCode $EC>
**Source:** your job $JOBID ($NAME), $(date -u +%Y-%m-%d).
EOF
