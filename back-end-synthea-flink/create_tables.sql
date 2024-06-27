 CREATE TABLE hospital (
  id_organization TEXT PRIMARY KEY,
  id_location TEXT,
  status TEXT,
  name TEXT,
  telecom TEXT,
  address_line TEXT,
  city TEXT,
  state TEXT,
  postalCode TEXT,
  country TEXT,
  longitude NUMERIC,
  latitude NUMERIC
);

CREATE TABLE practitioner (
  identifier TEXT,
  name TEXT,
  email TEXT,
  adress TEXT,
  city TEXT,
  state TEXT,
  postalCode TEXT,
  country TEXT,
  gender TEXT,
  role TEXT,
  id_organization TEXT,
  PRIMARY KEY (identifier),
  FOREIGN KEY (id_organization) REFERENCES hospital(id_organization)
);

CREATE TABLE patient (
    identifier TEXT,
    surname TEXT,
    familyName TEXT,
    gender TEXT,
    birthDate DATE,
    telecom TEXT,
    adress TEXT,
    city TEXT,
    state TEXT,
    postalCode TEXT,
    country TEXT, 
    maritalStatus TEXT,
    PRIMARY KEY(identifier)
);

CREATE TABLE visit (
    identifier TEXT,
    id_organization TEXT,
    id_practitioner TEXT,
    id_patient TEXT,
    status TEXT,
    startTime DATE,
    endTime DATE,
    type TEXT,
    PRIMARY KEY(identifier),
    FOREIGN KEY (id_organization) REFERENCES hospital(id_organization),
    FOREIGN KEY (id_practitioner) REFERENCES practitioner(identifier),
    FOREIGN KEY (id_patient) REFERENCES patient(identifier)
);


create table practitioner_stats
(
    id_practitioner text primary key,
    average_age     integer,
    min_age         integer,
    max_age         integer,
    total_patients  integer
);
