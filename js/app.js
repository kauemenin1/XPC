const form = document.getElementById("voucherForm");
const resultado = document.getElementById("resultado");
const rankingBody = document.getElementById("rankingBody");
const btnAtualizarRanking = document.getElementById("btnAtualizarRanking");

function gerarVoucher() {
  const data = new Date();
  const ano = data.getFullYear();
  const aleatorio = Math.floor(100000 + Math.random() * 900000);
  return `VCH-${ano}-${aleatorio}`;
}

function limparTelefone(numero) {
  let telefone = String(numero).replace(/\D/g, "");

  // Se vier com 11 dígitos, exemplo 51999999999, adiciona Brasil 55
  if (telefone.length === 11) {
    telefone = "55" + telefone;
  }

  return telefone;
}

function criarLinkWhatsApp(telefone, nomePortador, numeroVoucher) {
  const telefoneLimpo = limparTelefone(telefone);
  const mensagem = `Olá ${nomePortador}, segue seu voucher ${numeroVoucher}`;
  return `https://wa.me/${telefoneLimpo}?text=${encodeURIComponent(mensagem)}`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nomeSolicitante = document.getElementById("nomeSolicitante").value.trim();
  const idSolicitante = document.getElementById("idSolicitante").value.trim();
  const nomePortador = document.getElementById("nomePortador").value.trim();
  const cpfPortador = document.getElementById("cpfPortador").value.trim();
  const dataNascimento = document.getElementById("dataNascimento").value;
  const telefone = document.getElementById("telefone").value.trim();
  let numeroVoucher = document.getElementById("numeroVoucher").value.trim();

  if (!numeroVoucher) {
    numeroVoucher = gerarVoucher();
  }

  const linkWhatsApp = criarLinkWhatsApp(telefone, nomePortador, numeroVoucher);

  const registro = {
    nome_solicitante: nomeSolicitante,
    id_solicitante: idSolicitante,
    nome_portador: nomePortador,
    cpf_portador: cpfPortador,
    data_nascimento: dataNascimento,
    telefone: limparTelefone(telefone),
    numero_voucher: numeroVoucher,
    link_whatsapp: linkWhatsApp
  };

  const { error } = await supabaseClient
    .from("vouchers")
    .insert([registro]);

  if (error) {
    resultado.classList.remove("escondido");
    resultado.innerHTML = `
      <strong>Erro ao salvar:</strong><br>
      ${error.message}
    `;
    return;
  }

  resultado.classList.remove("escondido");
  resultado.innerHTML = `
    <strong>Voucher salvo com sucesso!</strong><br>
    Portador: ${nomePortador}<br>
    Voucher: ${numeroVoucher}<br>
    <a href="${linkWhatsApp}" target="_blank">Enviar pelo WhatsApp</a>
  `;

  form.reset();
  carregarRanking();
});

btnAtualizarRanking.addEventListener("click", carregarRanking);

async function carregarRanking() {
  const { data, error } = await supabaseClient
    .from("ranking_solicitantes")
    .select("*")
    .order("quantidade_vouchers", { ascending: false });

  if (error) {
    rankingBody.innerHTML = `
      <tr>
        <td colspan="4">Erro ao carregar ranking: ${error.message}</td>
      </tr>
    `;
    return;
  }

  if (!data || data.length === 0) {
    rankingBody.innerHTML = `
      <tr>
        <td colspan="4">Nenhum registro encontrado.</td>
      </tr>
    `;
    return;
  }

  rankingBody.innerHTML = "";

  data.forEach((item, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.nome_solicitante}</td>
      <td>${item.id_solicitante}</td>
      <td>${item.quantidade_vouchers}</td>
    `;

    rankingBody.appendChild(tr);
  });
}
