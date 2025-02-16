INSERT INTO companies (id, title, url)
VALUES ('ca2980ca-9b03-4031-924f-41a5a6f0a5cf', 'BH Telecom d.d. Sarajevo', 'https://www.bhtelecom.ba/');

INSERT INTO job_types (id, title)
VALUES ('7d96399f-310e-49dd-806f-de5ede0623c5','Ostalo');

INSERT INTO jobs (
  id,
	company_id,
	job_type_id,
	title,
	region,
	number_of_openings,
	external_url,
	start_date,
	end_date
)
VALUES (
  '94d9a4f4-2c98-403b-9b0c-5f1a3d96484d',
	'ca2980ca-9b03-4031-924f-41a5a6f0a5cf',
	'7d96399f-310e-49dd-806f-de5ede0623c5',
	'Monter, KV',
	'SREDNJOBOSANSKI_KANTON',
	1,
	'https://www.bhtelecom.ba/javni-oglasi-za-posao/2022/11/javni-oglas-43/',
	'2022-11-26T00:00:00.000Z',
	'2022-12-05T00:00:00.000Z'
);


INSERT INTO job_types (id, title)
VALUES ('ccb44885-ef07-4b83-b4a7-ce20c0141fcd','Knjigovođa');

INSERT INTO jobs (
	id,
	company_id,
	job_type_id,
	title,
	region,
	number_of_openings,
	external_url,
	start_date,
	end_date
)
VALUES (
	'dcb9dd64-f3a2-40d1-9f54-c8189825df22',
	'ca2980ca-9b03-4031-924f-41a5a6f0a5cf',
	'ccb44885-ef07-4b83-b4a7-ce20c0141fcd',
	'Finansijski knjigovođa Direkcija Sarajevo, SSS',
	'KANTON_SARAJEVO',
	1,
	'https://www.bhtelecom.ba/javni-oglasi-za-posao/2022/11/j-a-v-n-i-o-g-l-a-s-103/',
	'2022-11-26T00:00:00.000Z',
	'2022-12-05T00:00:00.000Z'
);
