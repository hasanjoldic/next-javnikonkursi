CREATE TABLE IF NOT EXISTS job_types (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,

  title TEXT UNIQUE NOT NULL,
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON job_types(title);

DROP TRIGGER IF EXISTS a_job_types_timestamp_trigger ON job_types;

CREATE TRIGGER a_job_types_timestamp_trigger
  BEFORE UPDATE ON job_types
  FOR EACH ROW EXECUTE PROCEDURE timestamp_trigger();

ALTER TABLE job_types ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS jobs (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id uuid REFERENCES companies(id),
  job_type_id uuid REFERENCES job_types(id),

  title TEXT NOT NULL,
  region regions NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  number_of_openings INT DEFAULT 1,

  external_url TEXT,
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON jobs(title);
CREATE INDEX ON jobs(region);
CREATE INDEX ON jobs(start_date);
CREATE INDEX ON jobs(end_date);

DROP TRIGGER IF EXISTS a_jobs_timestamp_trigger ON jobs;

CREATE TRIGGER a_jobs_timestamp_trigger
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE PROCEDURE timestamp_trigger();

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
