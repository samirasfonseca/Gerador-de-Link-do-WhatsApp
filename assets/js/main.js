const phoneInput = document.getElementById('phone');
const countryInput = document.getElementById('country');
const btnGenerate = document.getElementById('btnGenerate');
const btnOpen = document.getElementById('btnOpen');
const btnCopy = document.getElementById('btnCopy');
const linkPreview = document.getElementById('linkPreview');
const copyOk = document.getElementById('copyOk');
const btnDownloadQR = document.getElementById('btnDownloadQR');
const qrContainer = document.getElementById('qrcode');

let currentLink = '';
let qrCode;

function cleanNumber(num){
  return num.replace(/\D/g,'');
}

function generateLink(){
  const number = cleanNumber(phoneInput.value);
  const country = countryInput.value;

  if(number.length < 10 || number.length > 13){
    document.getElementById('errPhone').style.display = 'block';
    linkPreview.textContent = '—';
    btnOpen.disabled = true;
    btnCopy.disabled = true;
    btnDownloadQR.disabled = true;
    return;
  }

  /***************** Botão de Copiar Link ******************* */
  
  document.getElementById("btnCopy").addEventListener("click", () => {
  navigator.clipboard.writeText(linkPreview.textContent);
  const copyOk = document.getElementById("copyOk");
  copyOk.style.display = "inline"; // mostra a mensagem
  setTimeout(() => {
    copyOk.style.display = "none"; // esconde depois de 2s
  }, 2000);
});

  /****************************************************** */

  document.getElementById('errPhone').style.display = 'none';
  currentLink = `https://wa.me/${country}${number}`;
  linkPreview.textContent = currentLink;

  btnOpen.disabled = false;
  btnCopy.disabled = false;
  btnDownloadQR.disabled = false;

  /***************** gerar QR Code ******************* */

  qrContainer.innerHTML = '';
  qrCode = new QRCode(qrContainer, {
    text: currentLink,
    width: 160,
    height: 160
  });
}

btnGenerate.addEventListener('click', generateLink);

btnOpen.addEventListener('click', ()=>{
  window.open(currentLink,'_blank');
});

btnCopy.addEventListener('click', ()=>{
  navigator.clipboard.writeText(currentLink).then(()=>{
    copyOk.style.display='inline';
    setTimeout(()=>copyOk.style.display='none', 1500);
  });
});

btnDownloadQR.addEventListener('click', ()=>{
  const canvas = qrContainer.querySelector('canvas');
  if(!canvas) return;
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'whatsapp-link-qr.png';
  link.click();
});