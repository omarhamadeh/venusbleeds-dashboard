create table if not exists checkins (
  id uuid default gen_random_uuid() primary key,
  date date not null unique,
  mood text, energy text, intention text,
  yesterday_post text, yesterday_perf text,
  created_at timestamp with time zone default now()
);

create table if not exists post_logs (
  id bigint generated always as identity primary key,
  date date not null, pillar text not null,
  views integer default 0, likes integer default 0,
  saves integer default 0, shares integer default 0,
  note text, created_at timestamp with time zone default now()
);

create table if not exists competitors (
  id bigint generated always as identity primary key,
  handle text not null, why text,
  created_at timestamp with time zone default now()
);

create table if not exists competitor_logs (
  id bigint generated always as identity primary key,
  competitor_id bigint references competitors(id) on delete cascade,
  date date not null, note text not null,
  created_at timestamp with time zone default now()
);

create table if not exists saved_ideas (
  id bigint generated always as identity primary key,
  date date not null, pillar text, text text not null,
  created_at timestamp with time zone default now()
);

create table if not exists calendar_checks (
  id bigint generated always as identity primary key,
  week_key text not null, day text not null, checked boolean default false,
  unique(week_key, day)
);

create table if not exists settings (
  key text primary key, value text
);

alter table checkins disable row level security;
alter table post_logs disable row level security;
alter table competitors disable row level security;
alter table competitor_logs disable row level security;
alter table saved_ideas disable row level security;
alter table calendar_checks disable row level security;
alter table settings disable row level security;
