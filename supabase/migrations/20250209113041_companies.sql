CREATE TABLE IF NOT EXISTS companies (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,

  title TEXT UNIQUE NOT NULL,
  url TEXT UNIQUE NOT NULL,
  region regions,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON companies(title);
CREATE INDEX ON companies(url);
CREATE INDEX ON companies(region);

DROP TRIGGER IF EXISTS a_companies_timestamp_trigger ON companies;

CREATE TRIGGER a_companies_timestamp_trigger
  BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE PROCEDURE timestamp_trigger();

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
