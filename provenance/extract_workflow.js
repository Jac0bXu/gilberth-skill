export const meta = {
  name: 'gilbreth-extract-v2',
  description: 'Semantic extraction over all 111 Gilbreth skill docs (content + gotchas/playbooks/dynamic), 6 parallel agents -> chunk JSON',
  phases: [{ title: 'Extract', detail: 'one agent per ~19-file chunk' }],
}

const PROJECT = '/home/ubuntu/Documents/GitHub/gilberth-skill'

// 111 doc files (chunk 1 = the 19 curated knowledge files; chunks 2-6 = content/ docs)
const files = [
"/home/ubuntu/Documents/GitHub/gilberth-skill/DYNAMIC/cluster_snapshot.md","/home/ubuntu/Documents/GitHub/gilberth-skill/GOTCHAS.md","/home/ubuntu/Documents/GitHub/gilberth-skill/INDEX.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/README.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/apptainer.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/cfd_fluent.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/gaussian.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/interactive_jobs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/job_arrays.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/matlab.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/ml_training.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/mpi.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/python_conda.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/r_stats.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/serial.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PLAYBOOKS/transfer.md","/home/ubuntu/Documents/GitHub/gilberth-skill/PREFLIGHT.md","/home/ubuntu/Documents/GitHub/gilberth-skill/README.md","/home/ubuntu/Documents/GitHub/gilberth-skill/SKILL.md",
"/home/ubuntu/Documents/GitHub/gilberth-skill/content/accounts.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/biography.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/compile.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/compile/compile_gpu.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/compile/compile_hybrid.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/compile/compile_intel_mkl.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/compile/compile_mpi.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/compile/compile_openmp.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/compile/compile_serial.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/faqs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/gateway.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/gateway/cluster_tools.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/gateway/files.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/gateway/interactive/desktop.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/gateway/interactive/matlab.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/gateway/interactive/notebook.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/gateway/interactive/rstudio.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/gateway/interactive_apps.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/gateway/jobs.md",
"/home/ubuntu/Documents/GitHub/gilberth-skill/content/overview.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/ansysfluent/calculating.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/ansysfluent/preparing_cases.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/ansysfluent/submit_jobs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/ansysfluent/tui_journal.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/ansysfluent_example.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/apptainer_example.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/cancelling_job.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/checking_output.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/creating_the_submission_script.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/directives.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/example_installing_r_packages.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/example_loading_into_r.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/example_python_job.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/example_r_profile_setup.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/example_rstudio.md",
"/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/example_running_r_jobs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/python_conda.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/python_env_example.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/python_numpy.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/python_packages.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/python_pip.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/examples/python_source.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/gaussian_example.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/generic_slurm_jobs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/gpu_jobs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/gpu_usage_monitoring.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/holding_job.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/interactive_jobs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/job_dependencies.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/learning/customml.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/learning/ml_batch.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/matlab/implicit_parallelism.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/matlab/interpreter.md",
"/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/matlab/mdcs_parallel.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/matlab/parfor.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/matlab/profile_manager.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/matlab/spmd.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/matlab_example.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/monitoring_job.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/monitoring_resources.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/mpi_jobs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/multiple_node.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/openmp_jobs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/python_example.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/queues.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/r_example.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/serial_jobs.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/simple_job.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/run_jobs/submit_script.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/software.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/archive_and_compression.md",
"/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/environment_variables.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/ftp_sftp.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/globus.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/home_directory.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/hsi.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/htar.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/long_term_storage.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/recover.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/recover/flost.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/recover/mac.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/recover/manual.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/recover/windows.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/scp.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/scratch_space.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/sharing.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/storage_quota.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/tmp_directory.md","/home/ubuntu/Documents/GitHub/gilberth-skill/content/storage/windows_network_drive.md"
]

const CHUNK_SIZE = 19
const chunks = []
for (let i = 0; i < files.length; i += CHUNK_SIZE) chunks.push(files.slice(i, i + CHUNK_SIZE))

const SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    status: { type: 'string', enum: ['OK', 'FAIL'] },
    chunk: { type: 'integer' },
    nodes: { type: 'integer' }, edges: { type: 'integer' }, hyperedges: { type: 'integer' },
    reason: { type: 'string' },
  },
  required: ['status', 'chunk', 'nodes', 'edges'],
}

function prompt(chunk, n) {
  const fileList = chunk.join('\n')
  const outPath = PROJECT + '/graphify-out/.graphify_chunk_0' + n + '.json'
  return [
'You are a graphify extraction subagent. Read the files listed and extract a knowledge graph fragment.',
'Output ONLY valid JSON matching the schema below - no explanation, no markdown fences, no preamble.',
'Write the JSON to disk with the Write tool at: ' + outPath,
'',
'Files (chunk ' + n + ' of ' + chunks.length + '):',
fileList,
'',
'Rules:',
'- EXTRACTED: relationship explicit in source (citation, explicit cross-link, a page/rule that documents/uses a tool).',
'- INFERRED: reasonable inference (shared concept, two files about the same tool, implied dependency).',
'- AMBIGUOUS: uncertain - flag, do not omit.',
'',
'THIS CORPUS HAS TWO KINDS OF FILES:',
'(A) Curated knowledge files (GOTCHAS.md, PREFLIGHT.md, DYNAMIC/cluster_snapshot.md, SKILL.md, README.md, INDEX.md, PLAYBOOKS/*.md).',
'    For these, extract as concept nodes: each gotcha CODE (G1..G14) with its one-line title; each playbook workload',
'    (ml_training, python_conda, job_arrays, interactive, serial, mpi, matlab, r_stats, cfd_fluent, gaussian, apptainer, transfer);',
'    concrete cluster facts (modules: gcc/11.5.0, openmpi/4.1.6, cuda/12.6.0, external, rcac, conda/2026.03; partitions: a10, a30,',
'    a100-40gb, a100-80gb, h100, training; QOS: normal=14d, standby=4h, training=1d; limits: MaxArraySize=1001).',
'    Add edges: gotcha --mitigated_by--> playbook; gotcha --governs--> command/partition/module; playbook --references--> doc.',
'(B) Captured RCAC docs (content/**). Extract named concepts: Slurm commands & #SBATCH directives, GPUs (A100/A30/A10/H100),',
'    modules, storage tools (scp/sftp/Globus/hsi/htar/Fortress), Open OnDemand apps, compilers, languages. One document node per file.',
'',
'file_type MUST be one of exactly: code, document, paper, image, rationale, concept.',
'Use "document" for a file-as-source, "concept" for named entities/commands/tools/rules, "rationale" for ideas/principles.',
'',
'DEEP_MODE: false. Only INFERRED edges with clear evidence; otherwise omit or mark AMBIGUOUS.',
'Semantic similarity: same-problem concepts with no structural link -> semantically_similar_to (INFERRED 0.6-0.95), only when non-obvious.',
'Hyperedges: 3+ nodes in a shared flow/pattern not captured pairwise -> hyperedge. Max 3 per chunk.',
'Frontmatter: copy `source`/`source_url` into source_url on every node from that file.',
'',
'confidence_score REQUIRED on every edge: EXTRACTED=1.0; INFERRED one of {0.95,0.85,0.75,0.65,0.55} (never 0.5); AMBIGUOUS 0.1-0.3.',
'',
'Node ID format: lowercase [a-z0-9_]. Stem = file path RELATIVE TO the project root',
'  (/home/ubuntu/Documents/GitHub/gilberth-skill/), drop .md, lowercase, replace every non-alphanumeric with _, join ALL segments;',
'  then append _<entity> normalized to lowercase [a-z0-9_].',
'  Examples: content/run_jobs/gpu_jobs.md + "gres gpu" -> content_run_jobs_gpu_jobs_gres_gpu',
'            GOTCHAS.md + "G4 standby walltime" -> gotchas_g4_standby_walltime',
'            PLAYBOOKS/ml_training.md + "pi0" -> playbooks_ml_training_pi0',
'            DYNAMIC/cluster_snapshot.md + "MaxArraySize" -> dynamic_cluster_snapshot_maxarraysize',
'  Create ONE document node per file: id = <stem> (e.g. content_run_jobs_gpu_jobs, gotchas, playbooks_ml_training), file_type="document".',
'  CRITICAL: never append chunk/sequence suffixes. IDs deterministic from label alone.',
'',
'Schema (exact):',
'{"nodes":[{"id":"...","label":"...","file_type":"code|document|paper|image|rationale|concept","source_file":"<FILE_LIST path verbatim absolute>","source_location":null,"source_url":null,"captured_at":null,"author":null,"contributor":null}],"edges":[{"source":"node_id","target":"node_id","relation":"calls|implements|references|cites|conceptually_related_to|shares_data_with|semantically_similar_to|rationale_for|mitigated_by|governs","confidence":"EXTRACTED|INFERRED|AMBIGUOUS","confidence_score":1.0,"source_file":"<FILE_LIST path verbatim absolute>","source_location":null,"weight":1.0}],"hyperedges":[{"id":"snake_case_id","label":"...","nodes":["id1","id2","id3"],"relation":"participate_in|implement|form","confidence":"EXTRACTED|INFERRED","confidence_score":0.75,"source_file":"<FILE_LIST path verbatim absolute>"}],"input_tokens":0,"output_tokens":0}',
'',
'source_file RULE: the originating file path EXACTLY as in the file list above - verbatim, absolute. Do NOT shorten.',
'After writing the JSON to ' + outPath + ', return the structured summary (status OK, chunk number, node/edge/hyperedge counts).',
  ].join('\n')
}

phase('Extract')
log('Extracting ' + files.length + ' docs across ' + chunks.length + ' chunks...')
const sums = await parallel(chunks.map((c, i) => () =>
  agent(prompt(c, i + 1), { label: 'chunk' + (i + 1), phase: 'Extract', schema: SCHEMA })
))
const ok = sums.filter(Boolean).filter(s => s.status === 'OK')
const fail = sums.filter(Boolean).filter(s => s.status === 'FAIL')
const nodes = ok.reduce((a, s) => a + (s.nodes || 0), 0)
const edges = ok.reduce((a, s) => a + (s.edges || 0), 0)
log('Extraction: ' + ok.length + '/' + chunks.length + ' chunks OK, ~' + nodes + ' nodes, ~' + edges + ' edges, ' + fail.length + ' failed')
return { chunks: chunks.length, ok: ok.length, failed: fail.length, nodes, edges, failures: fail }
