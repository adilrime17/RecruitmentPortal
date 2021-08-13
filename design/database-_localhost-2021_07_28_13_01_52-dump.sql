--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Punjabi_India.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: stc_production; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA stc_production;


ALTER SCHEMA stc_production OWNER TO postgres;

--
-- Name: set_timestamp(); Type: FUNCTION; Schema: stc_production; Owner: postgres
--

CREATE FUNCTION stc_production.set_timestamp() RETURNS trigger
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
  NEW.updated_at = (now())::timestamp(0) without time zone;
  RETURN NEW;
END;
$$;


ALTER FUNCTION stc_production.set_timestamp() OWNER TO postgres;

--
-- Name: FUNCTION set_timestamp(); Type: COMMENT; Schema: stc_production; Owner: postgres
--

COMMENT ON FUNCTION stc_production.set_timestamp() IS 'To add datetime when an update occurs';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applicant_education; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.applicant_education (
    edu_id integer NOT NULL,
    edu_type_id integer NOT NULL,
    marks_obtained integer NOT NULL,
    grade character varying(5) NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    added_by character varying(15) NOT NULL,
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone,
    applicant_id integer NOT NULL,
    total_marks integer NOT NULL
);


ALTER TABLE stc_production.applicant_education OWNER TO postgres;

--
-- Name: applicant_education_edu_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.applicant_education_edu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.applicant_education_edu_id_seq OWNER TO postgres;

--
-- Name: applicant_education_edu_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.applicant_education_edu_id_seq OWNED BY stc_production.applicant_education.edu_id;


--
-- Name: applicant_information; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.applicant_information (
    applicant_id integer NOT NULL,
    reg_number character varying(15) NOT NULL,
    cnic bigint NOT NULL,
    applicant_number character varying(20),
    guardian_number character varying(20),
    hafiz boolean DEFAULT false NOT NULL,
    svas boolean DEFAULT false NOT NULL,
    dit boolean DEFAULT false NOT NULL,
    guardian_army_no character varying(20),
    guardian_unit character varying(10),
    guardian_corps character varying(10),
    guardian_dod date,
    charges_paid boolean DEFAULT false NOT NULL,
    added_by character varying(15),
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.applicant_information OWNER TO postgres;

--
-- Name: applicant_information_applicant_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.applicant_information_applicant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.applicant_information_applicant_id_seq OWNER TO postgres;

--
-- Name: applicant_information_applicant_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.applicant_information_applicant_id_seq OWNED BY stc_production.applicant_information.applicant_id;


--
-- Name: applicant_medical; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.applicant_medical (
    applicant_medical_id integer NOT NULL,
    applicant_id integer NOT NULL,
    referral_dd_id integer NOT NULL,
    sys integer,
    dsys integer,
    pulse integer,
    temperature real NOT NULL,
    status_update_id integer NOT NULL,
    remarks character varying(1000),
    referral_text character varying(1000),
    added_by character varying(15),
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.applicant_medical OWNER TO postgres;

--
-- Name: applicant_medical_applicant_medical_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.applicant_medical_applicant_medical_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.applicant_medical_applicant_medical_id_seq OWNER TO postgres;

--
-- Name: applicant_medical_applicant_medical_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.applicant_medical_applicant_medical_id_seq OWNED BY stc_production.applicant_medical.applicant_medical_id;


--
-- Name: applicant_tests; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.applicant_tests (
    applicant_test_id integer NOT NULL,
    test_id integer NOT NULL,
    applicant_id integer NOT NULL,
    date_of_test date NOT NULL,
    marks_obtained integer,
    test_qualified boolean DEFAULT false NOT NULL,
    added_by character varying(15) NOT NULL,
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.applicant_tests OWNER TO postgres;

--
-- Name: applicant_tests_edu_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.applicant_tests_edu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.applicant_tests_edu_id_seq OWNER TO postgres;

--
-- Name: applicant_tests_edu_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.applicant_tests_edu_id_seq OWNED BY stc_production.applicant_tests.applicant_test_id;


--
-- Name: applicant_trades; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.applicant_trades (
    applicant_trade_id integer NOT NULL,
    applicant_id integer NOT NULL,
    trade_id integer NOT NULL,
    added_by character varying(15) NOT NULL,
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.applicant_trades OWNER TO postgres;

--
-- Name: applicant_trades_applicant_trade_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.applicant_trades_applicant_trade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.applicant_trades_applicant_trade_id_seq OWNER TO postgres;

--
-- Name: applicant_trades_applicant_trade_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.applicant_trades_applicant_trade_id_seq OWNED BY stc_production.applicant_trades.applicant_trade_id;


--
-- Name: class; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.class (
    class_id integer NOT NULL,
    class_name character varying(15) NOT NULL,
    added_by character varying(15) NOT NULL,
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp without time zone
);


ALTER TABLE stc_production.class OWNER TO postgres;

--
-- Name: class_class_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.class_class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.class_class_id_seq OWNER TO postgres;

--
-- Name: class_class_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.class_class_id_seq OWNED BY stc_production.class.class_id;


--
-- Name: district; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.district (
    district_id integer NOT NULL,
    district_abbreviation character varying(10) NOT NULL,
    district_name character varying(25) NOT NULL,
    district_province character varying(20) NOT NULL,
    district_leniency boolean NOT NULL,
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone,
    added_by character varying(15),
    updated_at timestamp(0) without time zone,
    updated_by character varying(15)
);


ALTER TABLE stc_production.district OWNER TO postgres;

--
-- Name: district_district_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.district_district_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.district_district_id_seq OWNER TO postgres;

--
-- Name: district_district_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.district_district_id_seq OWNED BY stc_production.district.district_id;


--
-- Name: max_qualification; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.max_qualification (
    max_qualification_id integer NOT NULL,
    qualification_name character varying(25) NOT NULL,
    added_by character varying(15),
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.max_qualification OWNER TO postgres;

--
-- Name: max_qualification_max_qualification_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.max_qualification_max_qualification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.max_qualification_max_qualification_id_seq OWNER TO postgres;

--
-- Name: max_qualification_max_qualification_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.max_qualification_max_qualification_id_seq OWNED BY stc_production.max_qualification.max_qualification_id;


--
-- Name: referral_drop_down; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.referral_drop_down (
    referral_id integer NOT NULL,
    refferral_group character varying(25) NOT NULL,
    referral_type character varying(150) NOT NULL,
    referral_description character varying(150),
    added_by character varying(15) NOT NULL,
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.referral_drop_down OWNER TO postgres;

--
-- Name: referral_drop_down_referral_dd_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.referral_drop_down_referral_dd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.referral_drop_down_referral_dd_id_seq OWNER TO postgres;

--
-- Name: referral_drop_down_referral_dd_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.referral_drop_down_referral_dd_id_seq OWNED BY stc_production.referral_drop_down.referral_id;


--
-- Name: status_update; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.status_update (
    status_update_id integer NOT NULL,
    status_description character varying(75) NOT NULL,
    added_by character varying(15),
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.status_update OWNER TO postgres;

--
-- Name: status_update_status_update_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.status_update_status_update_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.status_update_status_update_id_seq OWNER TO postgres;

--
-- Name: status_update_status_update_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.status_update_status_update_id_seq OWNED BY stc_production.status_update.status_update_id;


--
-- Name: temp_data; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.temp_data (
    cnic bigint NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    middle_name character varying(25),
    dob date NOT NULL,
    class_id integer NOT NULL,
    height real NOT NULL,
    weight real NOT NULL,
    chest_min integer NOT NULL,
    chest_max integer NOT NULL,
    max_qualification_id integer NOT NULL,
    dlh boolean DEFAULT false NOT NULL,
    visible_deformity boolean DEFAULT false NOT NULL,
    wos boolean DEFAULT false NOT NULL,
    woa boolean DEFAULT false NOT NULL,
    ncse boolean DEFAULT false NOT NULL,
    district_id integer NOT NULL,
    added_by character varying(15),
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.temp_data OWNER TO postgres;

--
-- Name: tests; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.tests (
    test_id integer NOT NULL,
    test_name character varying(15),
    total_marks integer NOT NULL,
    passing_marks real NOT NULL,
    equivalence character varying(4) NOT NULL,
    remarks character varying(150),
    added_by character varying(15),
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.tests OWNER TO postgres;

--
-- Name: tests_test_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.tests_test_id_seq
    AS integer
    START WITH 16
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.tests_test_id_seq OWNER TO postgres;

--
-- Name: tests_test_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.tests_test_id_seq OWNED BY stc_production.tests.test_id;


--
-- Name: trades; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.trades (
    trade_id integer NOT NULL,
    trade_name character varying(15) NOT NULL,
    added_by character varying(15) NOT NULL,
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.trades OWNER TO postgres;

--
-- Name: trades_trade_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.trades_trade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.trades_trade_id_seq OWNER TO postgres;

--
-- Name: trades_trade_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.trades_trade_id_seq OWNED BY stc_production.trades.trade_id;


--
-- Name: type_of_education; Type: TABLE; Schema: stc_production; Owner: postgres
--

CREATE TABLE stc_production.type_of_education (
    edu_type_id integer NOT NULL,
    edu_equivalent character varying(15) NOT NULL,
    edu_type_name character varying(25),
    edu_major character varying(15),
    edu_subject character varying(15),
    writting_format character varying(125),
    added_by character varying(15),
    added_at timestamp(0) without time zone DEFAULT (now())::timestamp(0) without time zone NOT NULL,
    updated_by character varying(15),
    updated_at timestamp(0) without time zone
);


ALTER TABLE stc_production.type_of_education OWNER TO postgres;

--
-- Name: type_of_education_edu_type_id_seq; Type: SEQUENCE; Schema: stc_production; Owner: postgres
--

CREATE SEQUENCE stc_production.type_of_education_edu_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stc_production.type_of_education_edu_type_id_seq OWNER TO postgres;

--
-- Name: type_of_education_edu_type_id_seq; Type: SEQUENCE OWNED BY; Schema: stc_production; Owner: postgres
--

ALTER SEQUENCE stc_production.type_of_education_edu_type_id_seq OWNED BY stc_production.type_of_education.edu_type_id;


--
-- Name: applicant_education edu_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_education ALTER COLUMN edu_id SET DEFAULT nextval('stc_production.applicant_education_edu_id_seq'::regclass);


--
-- Name: applicant_information applicant_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_information ALTER COLUMN applicant_id SET DEFAULT nextval('stc_production.applicant_information_applicant_id_seq'::regclass);


--
-- Name: applicant_medical applicant_medical_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_medical ALTER COLUMN applicant_medical_id SET DEFAULT nextval('stc_production.applicant_medical_applicant_medical_id_seq'::regclass);


--
-- Name: applicant_tests applicant_test_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_tests ALTER COLUMN applicant_test_id SET DEFAULT nextval('stc_production.applicant_tests_edu_id_seq'::regclass);


--
-- Name: applicant_trades applicant_trade_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_trades ALTER COLUMN applicant_trade_id SET DEFAULT nextval('stc_production.applicant_trades_applicant_trade_id_seq'::regclass);


--
-- Name: class class_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.class ALTER COLUMN class_id SET DEFAULT nextval('stc_production.class_class_id_seq'::regclass);


--
-- Name: district district_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.district ALTER COLUMN district_id SET DEFAULT nextval('stc_production.district_district_id_seq'::regclass);


--
-- Name: max_qualification max_qualification_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.max_qualification ALTER COLUMN max_qualification_id SET DEFAULT nextval('stc_production.max_qualification_max_qualification_id_seq'::regclass);


--
-- Name: referral_drop_down referral_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.referral_drop_down ALTER COLUMN referral_id SET DEFAULT nextval('stc_production.referral_drop_down_referral_dd_id_seq'::regclass);


--
-- Name: status_update status_update_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.status_update ALTER COLUMN status_update_id SET DEFAULT nextval('stc_production.status_update_status_update_id_seq'::regclass);


--
-- Name: tests test_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.tests ALTER COLUMN test_id SET DEFAULT nextval('stc_production.tests_test_id_seq'::regclass);


--
-- Name: trades trade_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.trades ALTER COLUMN trade_id SET DEFAULT nextval('stc_production.trades_trade_id_seq'::regclass);


--
-- Name: type_of_education edu_type_id; Type: DEFAULT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.type_of_education ALTER COLUMN edu_type_id SET DEFAULT nextval('stc_production.type_of_education_edu_type_id_seq'::regclass);


--
-- Data for Name: applicant_education; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.applicant_education (edu_id, edu_type_id, marks_obtained, grade, verified, added_by, added_at, updated_by, updated_at, applicant_id, total_marks) FROM stdin;
\.


--
-- Data for Name: applicant_information; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.applicant_information (applicant_id, reg_number, cnic, applicant_number, guardian_number, hafiz, svas, dit, guardian_army_no, guardian_unit, guardian_corps, guardian_dod, charges_paid, added_by, added_at, updated_by, updated_at) FROM stdin;
\.


--
-- Data for Name: applicant_medical; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.applicant_medical (applicant_medical_id, applicant_id, referral_dd_id, sys, dsys, pulse, temperature, status_update_id, remarks, referral_text, added_by, added_at, updated_by, updated_at) FROM stdin;
\.


--
-- Data for Name: applicant_tests; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.applicant_tests (applicant_test_id, test_id, applicant_id, date_of_test, marks_obtained, test_qualified, added_by, added_at, updated_by, updated_at) FROM stdin;
\.


--
-- Data for Name: applicant_trades; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.applicant_trades (applicant_trade_id, applicant_id, trade_id, added_by, added_at, updated_by, updated_at) FROM stdin;
\.


--
-- Data for Name: class; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.class (class_id, class_name, added_by, added_at, updated_by, updated_at) FROM stdin;
1	Pb	mhussain	2021-06-14 07:00:54	\N	\N
2	Ptn	mhussain	2021-06-14 07:01:59	\N	\N
3	Sdh	mhussain	2021-06-14 07:03:45	\N	\N
4	Blc	mhussain	2021-06-14 07:03:45	\N	\N
5	K&GB	mhussain	2021-06-14 07:03:45	\N	\N
\.


--
-- Data for Name: district; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.district (district_id, district_abbreviation, district_name, district_province, district_leniency, added_at, added_by, updated_at, updated_by) FROM stdin;
1	Atk	Attock	Punjab	f	\N	mhussain	\N	\N
2	Bwp	Bahawalpur	Punjab	f	\N	mhussain	\N	\N
3	Bwn	Bahawalnagar	Punjab	f	\N	mhussain	\N	\N
4	Bkr	Bhakkar	Punjab	f	\N	mhussain	\N	\N
5	Chn	Chiniot	Punjab	f	\N	mhussain	\N	\N
6	Ckl	Chakwal	Punjab	f	\N	mhussain	\N	\N
7	DGK	DG Khan	Punjab	f	\N	mhussain	\N	\N
8	Fsd	Faisalabad	Punjab	f	\N	mhussain	\N	\N
9	Gwa	Gujranwala	Punjab	f	\N	mhussain	\N	\N
10	Gjt	Gujrat	Punjab	f	\N	mhussain	\N	\N
11	Hfz	Hafizabad	Punjab	f	\N	mhussain	\N	\N
12	Isd	Islamabad	Punjab	f	\N	mhussain	\N	\N
13	Jng	Jhang	Punjab	f	\N	mhussain	\N	\N
14	Jmr	Jhelum	Punjab	f	\N	mhussain	\N	\N
15	Ksr	Kasur	Punjab	f	\N	mhussain	\N	\N
16	Kwl	Khanewal	Punjab	f	\N	mhussain	\N	\N
17	Ksb	Khushab	Punjab	f	\N	mhussain	\N	\N
18	Lhr	Lahore	Punjab	f	\N	mhussain	\N	\N
19	Lei	Leiah	Punjab	f	\N	mhussain	\N	\N
20	Ldn	Lodhran	Punjab	f	\N	mhussain	\N	\N
21	MBD	MB Din	Punjab	f	\N	mhussain	\N	\N
22	Mwn	Mianwali	Punjab	f	\N	mhussain	\N	\N
23	Mtn	Multan	Punjab	f	\N	mhussain	\N	\N
24	Mgh	Muzaffargarh	Punjab	f	\N	mhussain	\N	\N
25	Nks	Nankana Sahib	Punjab	f	\N	mhussain	\N	\N
26	Nwl	Narowal	Punjab	f	\N	mhussain	\N	\N
27	Oka	Okara	Punjab	f	\N	mhussain	\N	\N
28	Pktn	Pakpattan	Punjab	f	\N	mhussain	\N	\N
29	RYK	R Y Khan	Punjab	f	\N	mhussain	\N	\N
30	Rnpr	Rajanpur	Punjab	f	\N	mhussain	\N	\N
31	Rwp	Rawalpindi	Punjab	f	\N	mhussain	\N	\N
32	Swl	Sahiwal	Punjab	f	\N	mhussain	\N	\N
33	Sgd	Sargodha	Punjab	f	\N	mhussain	\N	\N
34	Skpr	Sheikhupura	Punjab	f	\N	mhussain	\N	\N
35	Slk	Sialkot	Punjab	f	\N	mhussain	\N	\N
36	TTS	TT Singh	Punjab	f	\N	mhussain	\N	\N
37	Vhr	Vehari	Punjab	f	\N	mhussain	\N	\N
38	Atd	Abbottabad	KPK	f	\N	mhussain	\N	\N
39	B/A	Bajour Agy	KPK	t	\N	mhussain	\N	\N
40	Bnu	Bannu	KPK	f	\N	mhussain	\N	\N
41	Btg	Batgram	KPK	f	\N	mhussain	\N	\N
42	Bnr	Buner	KPK	f	\N	mhussain	\N	\N
43	Cha	Charsadda	KPK	f	\N	mhussain	\N	\N
44	Cht	Chitral	KPK	f	\N	mhussain	\N	\N
45	DIK	DI Khan	KPK	f	\N	mhussain	\N	\N
46	Dir(U)	Upper Dir	KPK	f	\N	mhussain	\N	\N
47	Dir (L)	Lower Dir	KPK	f	\N	mhussain	\N	\N
48	Hng	Hangu	KPK	f	\N	mhussain	\N	\N
49	Hpr	Haripur	KPK	f	\N	mhussain	\N	\N
50	Krk	Karak	KPK	f	\N	mhussain	\N	\N
51	K/A	Khyber Agy	KPK	t	\N	mhussain	\N	\N
52	Kht	Kohat	KPK	f	\N	mhussain	\N	\N
53	Khtn	Kohistan	KPK	f	\N	mhussain	\N	\N
54	Ku/A	Kurram Agy	KPK	t	\N	mhussain	\N	\N
55	LM	Lakki Marwat	KPK	f	\N	mhussain	\N	\N
56	Mkd	Malakand	KPK	f	\N	mhussain	\N	\N
57	Msr	Manshera	KPK	f	\N	mhussain	\N	\N
58	Mdn	Mardan	KPK	f	\N	mhussain	\N	\N
59	Mo/A	Mohmand Agy	KPK	t	\N	mhussain	\N	\N
60	Nsr	Nowshera	KPK	f	\N	mhussain	\N	\N
61	NWA	NW Agy	KPK	t	\N	mhussain	\N	\N
62	O/A	Orakzai Agy	KPK	t	\N	mhussain	\N	\N
63	Psc	Peshawar	KPK	f	\N	mhussain	\N	\N
64	Swt	Sawat	KPK	f	\N	mhussain	\N	\N
65	Shga	Shangla	KPK	f	\N	mhussain	\N	\N
66	SWA	SW Agency	KPK	t	\N	mhussain	\N	\N
67	Swb	Sawabi	KPK	f	\N	mhussain	\N	\N
68	Tnk	Tank	KPK	f	\N	mhussain	\N	\N
69	Tgr	Torghur	KPK	f	\N	mhussain	\N	\N
70	Bdn	Badin	Sindh	f	\N	mhussain	\N	\N
71	Dadu	Dadu	Sindh	f	\N	mhussain	\N	\N
72	Ghk	Ghotki	Sindh	f	\N	mhussain	\N	\N
73	Hyd	Hyderabad	Sindh	f	\N	mhussain	\N	\N
74	Jcb	Jacobabad	Sindh	f	\N	mhussain	\N	\N
75	Jmsr	Jamshoro	Sindh	f	\N	mhussain	\N	\N
78	Kci (E)	Karachi (E)	Sindh	f	\N	mhussain	\N	\N
79	Kci (S)	Karachi (S)	Sindh	f	\N	mhussain	\N	\N
80	Kci (W)	Karachi (W)	Sindh	f	\N	mhussain	\N	\N
81	Kmr	Kashmore	Sindh	f	\N	mhussain	\N	\N
82	Kpr	Khairpur	Sindh	f	\N	mhussain	\N	\N
83	Lkr	Larkana	Sindh	f	\N	mhussain	\N	\N
84	Mlr	Malir	Sindh	f	\N	mhussain	\N	\N
85	Mtri	Matiari	Sindh	f	\N	mhussain	\N	\N
86	MPK	Mirpur Khas	Sindh	f	\N	mhussain	\N	\N
87	NF	Naushahro Feroz	Sindh	f	\N	mhussain	\N	\N
88	NS	Nawab Shah	Sindh	f	\N	mhussain	\N	\N
89	Sgh	Sanghar	Sindh	f	\N	mhussain	\N	\N
90	Shpr	Shikarpur	Sindh	f	\N	mhussain	\N	\N
91	Skr	Sukkur	Sindh	f	\N	mhussain	\N	\N
92	TAY	Tando Allah Yar	Sindh	f	\N	mhussain	\N	\N
93	TMK	Tando M Khan	Sindh	f	\N	mhussain	\N	\N
94	T/MI	Tarparker/Mithi	Sindh	f	\N	mhussain	\N	\N
95	Tha	Thatta	Sindh	f	\N	mhussain	\N	\N
96	Ukr	Umerkot	Sindh	f	\N	mhussain	\N	\N
97	Bagh	Bagh	AK	f	\N	mhussain	\N	\N
98	Bhm	Bhimber	AK	f	\N	mhussain	\N	\N
99	Htn	Hatian	AK	f	\N	mhussain	\N	\N
100	Hvi	Haveli	AK	f	\N	mhussain	\N	\N
101	Kotli	Kotli	AK	f	\N	mhussain	\N	\N
102	Mpr	Mirpur	AK	f	\N	mhussain	\N	\N
76	Kmbr	Kamber (Shahdad Kot)	Sindh	f	\N	mhussain	\N	\N
103	Mzd	Muzaffarabad	AK	f	\N	mhussain	\N	\N
104	Nlm	Neelum	AK	f	\N	mhussain	\N	\N
105	Rwk	Rawalakot	AK	f	\N	mhussain	\N	\N
106	Sudh	Sudhnoti	AK	f	\N	mhussain	\N	\N
107	Awn	Awaran	Balochistan	t	\N	mhussain	\N	\N
108	Bkhn	Barkhan	Balochistan	t	\N	mhussain	\N	\N
109	Bln	Bolan	Balochistan	t	\N	mhussain	\N	\N
110	Chaghi	Chaghi	Balochistan	t	\N	mhussain	\N	\N
111	DB	Dera Bugti	Balochistan	t	\N	mhussain	\N	\N
112	Gdr	Gawadar	Balochistan	t	\N	mhussain	\N	\N
113	Jfd	Jafarabad	Balochistan	t	\N	mhussain	\N	\N
114	JM	Jhal Magsi	Balochistan	t	\N	mhussain	\N	\N
115	Klt	Kalat	Balochistan	t	\N	mhussain	\N	\N
116	Tbt	Turbat (Kech)	Balochistan	t	\N	mhussain	\N	\N
117	Krn	Kharan	Balochistan	t	\N	mhussain	\N	\N
118	Kzr	Khuzdar	Balochistan	t	\N	mhussain	\N	\N
119	Q/A	Qilla Abdullah	Balochistan	t	\N	mhussain	\N	\N
120	Q/S	Qilla Saifullah	Balochistan	t	\N	mhussain	\N	\N
121	Klu	Kohlu	Balochistan	t	\N	mhussain	\N	\N
122	Lba	Lasbela	Balochistan	t	\N	mhussain	\N	\N
123	LLI	Loralai	Balochistan	t	\N	mhussain	\N	\N
124	MK	Musa Khel	Balochistan	t	\N	mhussain	\N	\N
125	Mstg	Mustang	Balochistan	t	\N	mhussain	\N	\N
126	Nsd	Nasirabad	Balochistan	t	\N	mhussain	\N	\N
127	Nski	Naushki	Balochistan	t	\N	mhussain	\N	\N
128	Pgr	Panjgur	Balochistan	t	\N	mhussain	\N	\N
129	Psn	Pishin	Balochistan	t	\N	mhussain	\N	\N
130	Qta	Quetta	Balochistan	t	\N	mhussain	\N	\N
131	Sibi	Sibi	Balochistan	t	\N	mhussain	\N	\N
132	Zhb	Zhob	Balochistan	t	\N	mhussain	\N	\N
133	Zrt	Ziarat	Balochistan	t	\N	mhussain	\N	\N
134	Shni	Sherani	Balochistan	t	\N	mhussain	\N	\N
135	Hni	Harnai	Balochistan	t	\N	mhussain	\N	\N
136	Whk	Washuk	Balochistan	t	\N	mhussain	\N	\N
137	Astr	Astore	GB	t	\N	mhussain	\N	\N
138	Dmr	Diamer	GB	t	\N	mhussain	\N	\N
139	Glt	Gilgit	GB	t	\N	mhussain	\N	\N
140	Ghc	Ghanche	GB	t	\N	mhussain	\N	\N
141	Ghz	Ghizer	GB	t	\N	mhussain	\N	\N
142	Hngr 	Hunza Nagar	GB	t	\N	mhussain	\N	\N
143	Skd	Skardu	GB	t	\N	mhussain	\N	\N
77	Kci (C)	Karachi (C)	Sindh	f	\N	mhussain	\N	\N
\.


--
-- Data for Name: max_qualification; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.max_qualification (max_qualification_id, qualification_name, added_by, added_at, updated_by, updated_at) FROM stdin;
1	U/ Matric	mhussain	2021-07-24 12:25:54	\N	\N
2	Matric	mhussain	2021-07-24 12:26:25	\N	\N
3	Inter	mhussain	2021-07-24 12:26:39	\N	\N
4	Bachelor & Above	mhussain	2021-07-24 12:27:32	\N	\N
\.


--
-- Data for Name: referral_drop_down; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.referral_drop_down (referral_id, refferral_group, referral_type, referral_description, added_by, added_at, updated_by, updated_at) FROM stdin;
1	Surgical	Elbow Deformities	Cubitus valgus (carrying angle)	mhussain	2021-07-23 18:45:30	\N	\N
2	Surgical	Elbow Deformities	Cubitus varum	mhussain	2021-07-23 18:45:30	\N	\N
3	Surgical	Elbow Deformities	Other elbow deformities (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
4	Surgical	Chest Deformities	Pectus carinatum	mhussain	2021-07-23 18:45:30	\N	\N
5	Surgical	Chest Deformities	Pectus excavatum	mhussain	2021-07-23 18:45:30	\N	\N
6	Surgical	Chest Deformities	Other chest deformities (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
7	Surgical	Knee Deformities 	Genu valgus (knee knock)	mhussain	2021-07-23 18:45:30	\N	\N
8	Surgical	Knee Deformities 	Genu varum 	mhussain	2021-07-23 18:45:30	\N	\N
9	Surgical	Foot Deformities	Hallux valgus	mhussain	2021-07-23 18:45:30	\N	\N
10	Surgical	Foot Deformities	Hallux varum	mhussain	2021-07-23 18:45:30	\N	\N
11	Surgical	Foot Deformities	Pes planus (flat foot)	mhussain	2021-07-23 18:45:30	\N	\N
12	Surgical	Foot Deformities	Pes cavum (high arched foot)	mhussain	2021-07-23 18:45:30	\N	\N
13	Surgical	Foot Deformities	Mobile Pes planum	mhussain	2021-07-23 18:45:30	\N	\N
14	Surgical	Foot Deformities	Over riding toes	mhussain	2021-07-23 18:45:30	\N	\N
15	Surgical	Foot Deformities	Hammer toes	mhussain	2021-07-23 18:45:30	\N	\N
16	Surgical	Foot Deformities	Other foot deformities (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
17	Surgical	Spinal Deformities	Kyphosis	mhussain	2021-07-23 18:45:30	\N	\N
18	Surgical	Spinal Deformities	Scoliosis	mhussain	2021-07-23 18:45:30	\N	\N
19	Surgical	Spinal Deformities	Spina bifida	mhussain	2021-07-23 18:45:30	\N	\N
20	Surgical	Spinal Deformities	Winging of Scapula	mhussain	2021-07-23 18:45:30	\N	\N
21	Surgical	Spinal Deformities	Other spinal deformities (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
22	Surgical	External Genitalia 	Inguinal hernia	mhussain	2021-07-23 18:45:30	\N	\N
23	Surgical	External Genitalia 	Paraumbilical hernia	mhussain	2021-07-23 18:45:30	\N	\N
24	Surgical	External Genitalia 	Other hernias (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
25	Surgical	External Genitalia 	Epispadias	mhussain	2021-07-23 18:45:30	\N	\N
26	Surgical	External Genitalia 	Hypospadias	mhussain	2021-07-23 18:45:30	\N	\N
27	Surgical	External Genitalia 	Hydrocoele 	mhussain	2021-07-23 18:45:30	\N	\N
28	Surgical	External Genitalia 	Varicocoele	mhussain	2021-07-23 18:45:30	\N	\N
29	Surgical	External Genitalia 	Undescended testis	mhussain	2021-07-23 18:45:30	\N	\N
30	Surgical	External Genitalia 	Atrophic testis	mhussain	2021-07-23 18:45:30	\N	\N
31	Surgical	External Genitalia 	Scrotal swelling	mhussain	2021-07-23 18:45:30	\N	\N
32	Surgical	External Genitalia 	External hemorrhoids	mhussain	2021-07-23 18:45:30	\N	\N
33	Surgical	External Genitalia 	Internal hemarrhoids 	mhussain	2021-07-23 18:45:30	\N	\N
34	Surgical	External Genitalia 	Anal fissure	mhussain	2021-07-23 18:45:30	\N	\N
35	Surgical	External Genitalia 	Other genital diseases (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
36	Surgical	Scar Marks	Appendectomy 	mhussain	2021-07-23 18:45:30	\N	\N
37	Surgical	Scar Marks	Right Hand	mhussain	2021-07-23 18:45:30	\N	\N
38	Surgical	Scar Marks	Left Hand	mhussain	2021-07-23 18:45:30	\N	\N
39	Surgical	Scar Marks	Right Forearm	mhussain	2021-07-23 18:45:30	\N	\N
40	Surgical	Scar Marks	Left Forearm	mhussain	2021-07-23 18:45:30	\N	\N
41	Surgical	Scar Marks	Right Arm	mhussain	2021-07-23 18:45:30	\N	\N
42	Surgical	Scar Marks	Left Arm	mhussain	2021-07-23 18:45:30	\N	\N
43	Surgical	Scar Marks	Right Shoulder	mhussain	2021-07-23 18:45:30	\N	\N
44	Surgical	Scar Marks	Left Shoulder 	mhussain	2021-07-23 18:45:30	\N	\N
45	Surgical	Scar Marks	Chest	mhussain	2021-07-23 18:45:30	\N	\N
46	Surgical	Scar Marks	Back	mhussain	2021-07-23 18:45:30	\N	\N
47	Surgical	Scar Marks	Abdomen	mhussain	2021-07-23 18:45:30	\N	\N
48	Surgical	Scar Marks	Scalp	mhussain	2021-07-23 18:45:30	\N	\N
49	Surgical	Scar Marks	Face	mhussain	2021-07-23 18:45:30	\N	\N
50	Surgical	Scar Marks	Neck	mhussain	2021-07-23 18:45:30	\N	\N
51	Surgical	Scar Marks	Right Hip	mhussain	2021-07-23 18:45:30	\N	\N
52	Surgical	Scar Marks	Left Hip	mhussain	2021-07-23 18:45:30	\N	\N
53	Surgical	Scar Marks	Right Thigh	mhussain	2021-07-23 18:45:30	\N	\N
54	Surgical	Scar Marks	Left Thigh	mhussain	2021-07-23 18:45:30	\N	\N
55	Surgical	Scar Marks	Right Leg	mhussain	2021-07-23 18:45:30	\N	\N
56	Surgical	Scar Marks	Left Leg	mhussain	2021-07-23 18:45:30	\N	\N
57	Surgical	Scar Marks	Right Foot	mhussain	2021-07-23 18:45:30	\N	\N
58	Surgical	Scar Marks	Left Foot	mhussain	2021-07-23 18:45:30	\N	\N
59	Surgical	Scar Marks	Other scar marks (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
60	Surgical	Other Surgical Defects (Add remarks space for manual entry of specific problem)	Other scar marks (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
61	ENT	Nasal Deformities	DNS	mhussain	2021-07-23 18:45:30	\N	\N
62	ENT	Nasal Deformities	Enlarged turbinates	mhussain	2021-07-23 18:45:30	\N	\N
63	ENT	Nasal Deformities	Nasal polyp / polypi 	mhussain	2021-07-23 18:45:30	\N	\N
64	ENT	Nasal Deformities	Atrophic rhinitis	mhussain	2021-07-23 18:45:30	\N	\N
65	ENT	Nasal Deformities	Other nasal deformities (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
66	ENT	Ear Deformities	External ear defects (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
67	ENT	Ear Deformities	Otitis externa	mhussain	2021-07-23 18:45:30	\N	\N
68	ENT	Ear Deformities	Otitis media	mhussain	2021-07-23 18:45:30	\N	\N
69	ENT	Ear Deformities	Aural discharge	mhussain	2021-07-23 18:45:30	\N	\N
70	ENT	Ear Deformities	Wax	mhussain	2021-07-23 18:45:30	\N	\N
71	ENT	Ear Deformities	Perforated tampanic membrane	mhussain	2021-07-23 18:45:30	\N	\N
72	ENT	Ear Deformities	Wax + TM Exam	mhussain	2021-07-23 18:45:30	\N	\N
73	ENT	Ear Deformities	Other ear defects (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
74	ENT	Throat Deformities	Tonsillitis	mhussain	2021-07-23 18:45:30	\N	\N
75	ENT	Throat Deformities	Deformed uvula	mhussain	2021-07-23 18:45:30	\N	\N
76	ENT	Throat Deformities	Other throat deformities (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
77	ENT	Other ENT Defects (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
78	Eye	Squint	\N	mhussain	2021-07-23 18:45:30	\N	\N
79	Eye	Trachoma	\N	mhussain	2021-07-23 18:45:30	\N	\N
80	Eye	Ptosis	\N	mhussain	2021-07-23 18:45:30	\N	\N
81	Eye	Conjunctivitis	\N	mhussain	2021-07-23 18:45:30	\N	\N
82	Eye	Lid swelling	\N	mhussain	2021-07-23 18:45:30	\N	\N
83	Eye	Dirty sclera	\N	mhussain	2021-07-23 18:45:30	\N	\N
84	Eye	Other eye defects (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
85	Skin	Hyper-pigmentation (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
86	Skin	Hypo-pigmentation (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
87	Skin	Hyperhydrosis	\N	mhussain	2021-07-23 18:45:30	\N	\N
88	Skin	Skin lesions (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
89	Skin	Other skin deformities (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
90	Thyroid	Goitre	\N	mhussain	2021-07-23 18:45:30	\N	\N
91	Thyroid	Other thyroid defects (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
92	Lymph nodes	Swellings (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
93	Lymph nodes	Lymphadenitis (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
94	Nail Deformities	Koilonychia	\N	mhussain	2021-07-23 18:45:30	\N	\N
95	Nail Deformities	Splinter hemorrhages	\N	mhussain	2021-07-23 18:45:30	\N	\N
96	Nail Deformities	Other nail deformities (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
97	Medical	Speech	Stammer	mhussain	2021-07-23 18:45:30	\N	\N
98	Medical	Speech	Stutter	mhussain	2021-07-23 18:45:30	\N	\N
99	Medical	Speech	Slurring	mhussain	2021-07-23 18:45:30	\N	\N
100	Medical	Speech	Monotonous	mhussain	2021-07-23 18:45:30	\N	\N
101	Medical	Speech	Other speech defects (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
102	Medical	General	Anemia	mhussain	2021-07-23 18:45:30	\N	\N
103	Medical	General	Jaundice	mhussain	2021-07-23 18:45:30	\N	\N
104	Medical	General	Cyanosis (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
105	Medical	General	Edema (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
106	Medical	General	Clubbing (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
107	Medical	Cardiac	Tachycardia	mhussain	2021-07-23 18:45:30	\N	\N
108	Medical	Cardiac	Bradycardia	mhussain	2021-07-23 18:45:30	\N	\N
109	Medical	Cardiac	Heart murmur	mhussain	2021-07-23 18:45:30	\N	\N
110	Medical	Cardiac	Hypertension	mhussain	2021-07-23 18:45:30	\N	\N
111	Medical	Cardiac	Arrythmia	mhussain	2021-07-23 18:45:30	\N	\N
112	Medical	Cardiac	Other cardiac defects (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
113	Medical	Respiratory	Asthma	mhussain	2021-07-23 18:45:30	\N	\N
114	Medical	Respiratory	Bronchitis	mhussain	2021-07-23 18:45:30	\N	\N
115	Medical	Respiratory	History of TB	mhussain	2021-07-23 18:45:30	\N	\N
116	Medical	Respiratory	Other pulmonary diseases (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
117	Medical	Abdominal 	Defects (Add remarks space for manual entry of specific problem)	mhussain	2021-07-23 18:45:30	\N	\N
118	Medical	Other Medical Defects (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
119	Dental	Dental hygiene 	\N	mhussain	2021-07-23 18:45:30	\N	\N
120	Dental	Caries	\N	mhussain	2021-07-23 18:45:30	\N	\N
121	Dental	Pyorrhea	\N	mhussain	2021-07-23 18:45:30	\N	\N
122	Dental	Scurvy	\N	mhussain	2021-07-23 18:45:30	\N	\N
123	Dental	Other dental defects (Add remarks space for manual entry of specific problem)	\N	mhussain	2021-07-23 18:45:30	\N	\N
\.


--
-- Data for Name: status_update; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.status_update (status_update_id, status_description, added_by, added_at, updated_by, updated_at) FROM stdin;
1	Fit by RMO	mhussain	2021-07-24 16:03:49	\N	\N
2	UNFIT By RMO (Reason fetched from template)	mhussain	2021-07-24 16:03:49	\N	\N
3	TUF (Reason)	mhussain	2021-07-24 16:03:49	\N	\N
4	Referred to Specialist (Incl type of specialist from referrals)	mhussain	2021-07-24 16:03:49	\N	\N
5	UNFIT by ______ Specialist in __________	mhussain	2021-07-24 16:03:49	\N	\N
6	Referred	mhussain	2021-07-24 16:04:36	\N	\N
\.


--
-- Data for Name: temp_data; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.temp_data (cnic, first_name, last_name, middle_name, dob, class_id, height, weight, chest_min, chest_max, max_qualification_id, dlh, visible_deformity, wos, woa, ncse, district_id, added_by, added_at, updated_by, updated_at) FROM stdin;
\.


--
-- Data for Name: tests; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.tests (test_id, test_name, total_marks, passing_marks, equivalence, remarks, added_by, added_at, updated_by, updated_at) FROM stdin;
1	Personality Tes	120	30	<=	Suitable/Unsuitable	mhussain	2021-07-24 14:17:12	\N	\N
2	Int Test	50	20	>=	Pass/Fail	mhussain	2021-07-24 14:17:12	\N	\N
3	Written U/Matri	50	25	>=	Pass/Fail	mhussain	2021-07-24 14:17:12	\N	\N
4	Written test	100	50	>=	Pass/Fail	mhussain	2021-07-24 14:17:12	\N	\N
5	Tech test	100	50	>=	Pass/Fail	mhussain	2021-07-24 14:17:12	\N	\N
6	Clk Test	100	50	>=	Pass/Fail	mhussain	2021-07-24 14:17:12	\N	\N
7	Aptitude test	20	10	>=	For DLH Pass/Fail	mhussain	2021-07-24 14:17:12	\N	\N
8	Computer Diplom	50	25	>=	For DIT Pass/Fail	mhussain	2021-07-24 14:17:12	\N	\N
9	Hifz Test	1	1	==	Pass/Fail	mhussain	2021-07-24 14:17:12	\N	\N
10	PET	25	12	>=	Any event Fail Consider fail	mhussain	2021-07-24 14:17:12	\N	\N
11	1 Mile	10	5	>=	\N	mhussain	2021-07-24 14:24:21	\N	\N
12	Pull up	5	2.5	>=	\N	mhussain	2021-07-24 14:26:08	\N	\N
13	Push up	5	2.5	>=	\N	mhussain	2021-07-24 14:27:11	\N	\N
14	Crunches	5	2.5	>=	\N	mhussain	2021-07-24 14:27:48	\N	\N
15	Ditch	1	1	==	\N	mhussain	2021-07-24 14:28:44	\N	\N
\.


--
-- Data for Name: trades; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.trades (trade_id, trade_name, added_by, added_at, updated_by, updated_at) FROM stdin;
1	Tech	mhussain	2021-06-16 10:31:11	\N	\N
2	Clk/SMT	mhussain	2021-06-16 10:31:11	\N	\N
3	Dvr	mhussain	2021-06-16 10:31:11	\N	\N
4	Sigs	mhussain	2021-06-16 10:31:11	\N	\N
5	BDSM	mhussain	2021-06-16 10:31:11	\N	\N
6	Cook	mhussain	2021-07-03 12:51:04	\N	\N
7	NCsE	mhussain	2021-07-03 12:51:30	\N	\N
\.


--
-- Data for Name: type_of_education; Type: TABLE DATA; Schema: stc_production; Owner: postgres
--

COPY stc_production.type_of_education (edu_type_id, edu_equivalent, edu_type_name, edu_major, edu_subject, writting_format, added_by, added_at, updated_by, updated_at) FROM stdin;
6	SSC	10th	Science	CS	M(S) Obtained Mks/Grading-Subject	mhussain	2021-07-23 18:06:43	\N	\N
10	SSC	10th	Science	Tech	M(S) Obtained Mks/Grading-Subject	mhussain	2021-07-23 18:06:43	\N	\N
34	Master	M.Com	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading| MA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
33	Master	MBA	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading| MA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
32	Master	BSCS	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading| MA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
26	Bachler	B.Com	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
25	Bachler	BSc	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
24	Bachler	BA	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
31	Master	BS	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading| MA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
19	HSSC	DAE	Electronics	\N	M(S) Obtained Mks/Grading-Subject| DAE Obtain Mks/Grading-Electrical	mhussain	2021-07-23 18:06:43	\N	\N
18	HSSC	DAE	Electrical	\N	M(S) Obtained Mks/Grading-Subject| DAE Obtain Mks/Grading-Electrical	mhussain	2021-07-23 18:06:43	\N	\N
27	Bachler	BBA	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
23	HSSC	DAE	IT	\N	M(S) Obtained Mks/Grading-Subject| DAE Obtain Mks/Grading-Electrical	mhussain	2021-07-23 18:06:43	\N	\N
22	HSSC	DAE	Refrigerator	\N	M(S) Obtained Mks/Grading-Subject| DAE Obtain Mks/Grading-Electrical	mhussain	2021-07-23 18:06:43	\N	\N
21	HSSC	DAE	Civ	\N	M(S) Obtained Mks/Grading-Subject| DAE Obtain Mks/Grading-Electrical	mhussain	2021-07-23 18:06:43	\N	\N
20	HSSC	DAE	Mech	\N	M(S) Obtained Mks/Grading-Subject| DAE Obtain Mks/Grading-Electrical	mhussain	2021-07-23 18:06:43	\N	\N
5	U/ Matric	9th	\N	\N	9th	mhussain	2021-07-23 18:06:43	\N	\N
17	HSSC	FA	\N	\N	M(S) Obtained Mks/Grading-Subject| ICS Obtain Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
14	HSSC	ICS	\N	\N	M(S) Obtained Mks/Grading-Subject| ICS Obtain Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
16	HSSC	D.Com	\N	\N	M(S) Obtained Mks/Grading-Subject| ICS Obtain Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
4	U/ Matric	8th	\N	\N	8th	mhussain	2021-07-23 18:06:43	\N	\N
15	HSSC	I.Com	\N	\N	M(S) Obtained Mks/Grading-Subject| ICS Obtain Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
2	U/ Matric	6th	\N	\N	6th	mhussain	2021-07-23 18:06:43	\N	\N
1	U/ Matric	5th	\N	\N	5th	mhussain	2021-07-23 18:06:43	\N	\N
30	Master	MSc	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading| MA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
29	Master	MA	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading| MA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
28	Bachler	BCS	\N	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM| BA Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
3	U/ Matric	7th	\N	\N	7th	mhussain	2021-07-23 18:06:43	\N	\N
12	HSSC	FSc	PM	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PM	mhussain	2021-07-23 18:06:43	\N	\N
13	HSSC	FSc	PE	\N	M(S) Obtained Mks/Grading-Subject| FSc Obtain Mks/Grading-PE	mhussain	2021-07-23 18:06:43	\N	\N
11	SSC	10th	Arts	\N	M(A) Obtained Mks/Grading	mhussain	2021-07-23 18:06:43	\N	\N
7	SSC	10th	Science	Bio	M(S) Obtained Mks/Grading-Subject	mhussain	2021-07-23 18:06:43	\N	\N
9	SSC	10th	Science	Pol	M(S) Obtained Mks/Grading-Subject	mhussain	2021-07-23 18:06:43	\N	\N
8	SSC	10th	Science	EW	M(S) Obtained Mks/Grading-Subject	mhussain	2021-07-23 18:06:43	\N	\N
\.


--
-- Name: applicant_education_edu_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.applicant_education_edu_id_seq', 1, false);


--
-- Name: applicant_information_applicant_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.applicant_information_applicant_id_seq', 1, false);


--
-- Name: applicant_medical_applicant_medical_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.applicant_medical_applicant_medical_id_seq', 1, false);


--
-- Name: applicant_tests_edu_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.applicant_tests_edu_id_seq', 1, false);


--
-- Name: applicant_trades_applicant_trade_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.applicant_trades_applicant_trade_id_seq', 1, false);


--
-- Name: class_class_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.class_class_id_seq', 8, true);


--
-- Name: district_district_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.district_district_id_seq', 1, false);


--
-- Name: max_qualification_max_qualification_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.max_qualification_max_qualification_id_seq', 4, true);


--
-- Name: referral_drop_down_referral_dd_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.referral_drop_down_referral_dd_id_seq', 123, true);


--
-- Name: status_update_status_update_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.status_update_status_update_id_seq', 6, true);


--
-- Name: tests_test_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.tests_test_id_seq', 16, true);


--
-- Name: trades_trade_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.trades_trade_id_seq', 7, true);


--
-- Name: type_of_education_edu_type_id_seq; Type: SEQUENCE SET; Schema: stc_production; Owner: postgres
--

SELECT pg_catalog.setval('stc_production.type_of_education_edu_type_id_seq', 34, true);


--
-- Name: applicant_education applicant_education_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_education
    ADD CONSTRAINT applicant_education_pk PRIMARY KEY (edu_id);


--
-- Name: applicant_information applicant_information_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_information
    ADD CONSTRAINT applicant_information_pk PRIMARY KEY (applicant_id);


--
-- Name: applicant_medical applicant_medical_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_medical
    ADD CONSTRAINT applicant_medical_pk PRIMARY KEY (applicant_medical_id);


--
-- Name: applicant_tests applicant_tests_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_tests
    ADD CONSTRAINT applicant_tests_pk PRIMARY KEY (applicant_test_id);


--
-- Name: applicant_trades applicant_trades_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_trades
    ADD CONSTRAINT applicant_trades_pk PRIMARY KEY (applicant_trade_id);


--
-- Name: class class_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.class
    ADD CONSTRAINT class_pk PRIMARY KEY (class_id);


--
-- Name: district district_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.district
    ADD CONSTRAINT district_pk PRIMARY KEY (district_id);


--
-- Name: max_qualification max_qualification_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.max_qualification
    ADD CONSTRAINT max_qualification_pk PRIMARY KEY (max_qualification_id);


--
-- Name: referral_drop_down referral_drop_down_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.referral_drop_down
    ADD CONSTRAINT referral_drop_down_pk PRIMARY KEY (referral_id);


--
-- Name: status_update status_update_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.status_update
    ADD CONSTRAINT status_update_pk PRIMARY KEY (status_update_id);


--
-- Name: temp_data temp_data_2_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.temp_data
    ADD CONSTRAINT temp_data_2_pk PRIMARY KEY (cnic);


--
-- Name: tests tests_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.tests
    ADD CONSTRAINT tests_pk PRIMARY KEY (test_id);


--
-- Name: trades trades_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.trades
    ADD CONSTRAINT trades_pk PRIMARY KEY (trade_id);


--
-- Name: type_of_education type_of_education_pk; Type: CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.type_of_education
    ADD CONSTRAINT type_of_education_pk PRIMARY KEY (edu_type_id);


--
-- Name: applicant_education_edu_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX applicant_education_edu_id_uindex ON stc_production.applicant_education USING btree (edu_id);


--
-- Name: applicant_information_applicant_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX applicant_information_applicant_id_uindex ON stc_production.applicant_information USING btree (applicant_id);


--
-- Name: applicant_information_cnic_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX applicant_information_cnic_uindex ON stc_production.applicant_information USING btree (cnic);


--
-- Name: applicant_medical_applicant_medical_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX applicant_medical_applicant_medical_id_uindex ON stc_production.applicant_medical USING btree (applicant_medical_id);


--
-- Name: applicant_tests_applicant_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX applicant_tests_applicant_id_uindex ON stc_production.applicant_tests USING btree (applicant_id);


--
-- Name: applicant_tests_edu_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX applicant_tests_edu_id_uindex ON stc_production.applicant_tests USING btree (applicant_test_id);


--
-- Name: applicant_trades_applicant_trade_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX applicant_trades_applicant_trade_id_uindex ON stc_production.applicant_trades USING btree (applicant_trade_id);


--
-- Name: class_class_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX class_class_id_uindex ON stc_production.class USING btree (class_id);


--
-- Name: district_district_abbreviation_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX district_district_abbreviation_uindex ON stc_production.district USING btree (district_abbreviation);


--
-- Name: district_district_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX district_district_id_uindex ON stc_production.district USING btree (district_id);


--
-- Name: district_district_name_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX district_district_name_uindex ON stc_production.district USING btree (district_name);


--
-- Name: max_qualification_max_qualification_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX max_qualification_max_qualification_id_uindex ON stc_production.max_qualification USING btree (max_qualification_id);


--
-- Name: referral_drop_down_referral_dd_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX referral_drop_down_referral_dd_id_uindex ON stc_production.referral_drop_down USING btree (referral_id);


--
-- Name: status_update_status_description_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX status_update_status_description_uindex ON stc_production.status_update USING btree (status_description);


--
-- Name: status_update_status_update_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX status_update_status_update_id_uindex ON stc_production.status_update USING btree (status_update_id);


--
-- Name: temp_data_2_cnic_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX temp_data_2_cnic_uindex ON stc_production.temp_data USING btree (cnic);


--
-- Name: tests_test_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX tests_test_id_uindex ON stc_production.tests USING btree (test_id);


--
-- Name: trades_trade_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX trades_trade_id_uindex ON stc_production.trades USING btree (trade_id);


--
-- Name: trades_trade_name_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX trades_trade_name_uindex ON stc_production.trades USING btree (trade_name);


--
-- Name: type_of_education_edu_type_id_uindex; Type: INDEX; Schema: stc_production; Owner: postgres
--

CREATE UNIQUE INDEX type_of_education_edu_type_id_uindex ON stc_production.type_of_education USING btree (edu_type_id);


--
-- Name: applicant_education applicant_education_applicant_information_applicant_id_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_education
    ADD CONSTRAINT applicant_education_applicant_information_applicant_id_fk FOREIGN KEY (applicant_id) REFERENCES stc_production.applicant_information(applicant_id);


--
-- Name: applicant_education applicant_education_type_of_education_edu_type_id_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_education
    ADD CONSTRAINT applicant_education_type_of_education_edu_type_id_fk FOREIGN KEY (edu_type_id) REFERENCES stc_production.type_of_education(edu_type_id);


--
-- Name: applicant_information applicant_information_temp_data_cnic_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_information
    ADD CONSTRAINT applicant_information_temp_data_cnic_fk FOREIGN KEY (cnic) REFERENCES stc_production.temp_data(cnic);


--
-- Name: applicant_medical applicant_medical___fk_medical; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_medical
    ADD CONSTRAINT applicant_medical___fk_medical FOREIGN KEY (referral_dd_id) REFERENCES stc_production.referral_drop_down(referral_id);


--
-- Name: applicant_medical applicant_medical_applicant_information_applicant_id_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_medical
    ADD CONSTRAINT applicant_medical_applicant_information_applicant_id_fk FOREIGN KEY (applicant_id) REFERENCES stc_production.applicant_information(applicant_id);


--
-- Name: applicant_medical applicant_medical_status_update_status_update_id_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_medical
    ADD CONSTRAINT applicant_medical_status_update_status_update_id_fk FOREIGN KEY (status_update_id) REFERENCES stc_production.status_update(status_update_id);


--
-- Name: applicant_tests applicant_tests_applicant_information_applicant_id_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_tests
    ADD CONSTRAINT applicant_tests_applicant_information_applicant_id_fk FOREIGN KEY (applicant_id) REFERENCES stc_production.applicant_information(applicant_id);


--
-- Name: applicant_tests applicant_tests_tests_test_id_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_tests
    ADD CONSTRAINT applicant_tests_tests_test_id_fk FOREIGN KEY (test_id) REFERENCES stc_production.tests(test_id);


--
-- Name: applicant_trades applicant_trades___fk_trade; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_trades
    ADD CONSTRAINT applicant_trades___fk_trade FOREIGN KEY (trade_id) REFERENCES stc_production.trades(trade_id);


--
-- Name: applicant_trades applicant_trades_applicant_information_applicant_id_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.applicant_trades
    ADD CONSTRAINT applicant_trades_applicant_information_applicant_id_fk FOREIGN KEY (applicant_id) REFERENCES stc_production.applicant_information(applicant_id);


--
-- Name: temp_data temp_data_class_class_id_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.temp_data
    ADD CONSTRAINT temp_data_class_class_id_fk FOREIGN KEY (class_id) REFERENCES stc_production.class(class_id);


--
-- Name: temp_data temp_data_district_district_id_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.temp_data
    ADD CONSTRAINT temp_data_district_district_id_fk FOREIGN KEY (district_id) REFERENCES stc_production.district(district_id);


--
-- Name: temp_data temp_data_max_qualification_max_qualification_id_fk; Type: FK CONSTRAINT; Schema: stc_production; Owner: postgres
--

ALTER TABLE ONLY stc_production.temp_data
    ADD CONSTRAINT temp_data_max_qualification_max_qualification_id_fk FOREIGN KEY (max_qualification_id) REFERENCES stc_production.max_qualification(max_qualification_id);


--
-- Name: SCHEMA stc_production; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA stc_production FROM postgres;
GRANT ALL ON SCHEMA stc_production TO postgres WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

