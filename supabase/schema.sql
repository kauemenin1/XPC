create table if not exists public.vouchers (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone default now(),

  nome_solicitante text not null,
  id_solicitante text not null,

  nome_portador text not null,
  cpf_portador text not null,
  data_nascimento date not null,
  telefone text not null,

  numero_voucher text not null unique,
  link_whatsapp text
);

create or replace view public.ranking_solicitantes as
select
  nome_solicitante,
  id_solicitante,
  count(*) as quantidade_vouchers,
  min(created_at) as primeiro_voucher,
  max(created_at) as ultimo_voucher
from public.vouchers
group by nome_solicitante, id_solicitante
order by quantidade_vouchers desc;

-- Para teste inicial simples:
-- No Supabase, em Authentication > Policies, habilite RLS somente depois de entender as regras.
-- Se o RLS estiver ativo, crie policies adequadas para insert/select.
