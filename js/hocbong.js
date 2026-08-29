const search=document.getElementById('search');
const cards=[...document.querySelectorAll('#scholarshipGrid .card')];
const buttons=[...document.querySelectorAll('.filters button')];
let filter='all';

function render(){
  const q=(search.value||'').toLowerCase().trim();
  cards.forEach(c=>{
    const ok=(filter==='all'||c.dataset.type===filter)&&(!q||(c.dataset.search+' '+c.innerText).toLowerCase().includes(q));
    c.style.display=ok?'block':'none';
  });
}
search.addEventListener('input',render);
buttons.forEach(b=>b.addEventListener('click',()=>{
  buttons.forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  filter=b.dataset.filter;
  render();
}));

// Scholarship application functions.
const form=document.getElementById('scholarshipForm');
const scholarshipSelect=document.getElementById('scholarshipSelect');
const applicationType=document.getElementById('applicationType');
const statusBox=document.getElementById('formStatus');
const listBox=document.getElementById('applicationList');
const draftKey='oxford_nhabe_scholarship_draft';
const applicationsKey='oxford_nhabe_scholarship_applications';

function showStatus(message){
  statusBox.textContent=message;
  statusBox.classList.add('show');
}

function formDataObject(){
  return {
    scholarship:scholarshipSelect.value,
    type:applicationType.value,
    name:document.getElementById('studentName').value.trim(),
    id:document.getElementById('studentId').value.trim(),
    email:document.getElementById('studentEmail').value.trim(),
    phone:document.getElementById('studentPhone').value.trim(),
    profile:(document.querySelector('input[name="profile"]:checked')||{}).value||'',
    motivation:document.getElementById('motivation').value.trim(),
    updatedAt:new Date().toLocaleString('vi-VN')
  };
}

function fillForm(d){
  if(!d)return;
  scholarshipSelect.value=d.scholarship||'';
  applicationType.value=d.type||'';
  document.getElementById('studentName').value=d.name||'';
  document.getElementById('studentId').value=d.id||'';
  document.getElementById('studentEmail').value=d.email||'';
  document.getElementById('studentPhone').value=d.phone||'';
  document.getElementById('motivation').value=d.motivation||'';
  document.querySelectorAll('input[name="profile"]').forEach(r=>r.checked=r.value===d.profile);
}

function renderApplications(){
  const apps=JSON.parse(localStorage.getItem(applicationsKey)||'[]');
  if(!apps.length){
    listBox.innerHTML='<div class="empty">Chưa có hồ sơ nào. Hãy chọn học bổng và bắt đầu hồ sơ.</div>';
    return;
  }
  listBox.innerHTML=apps.map(a=>`
    <div class="application-item">
      <div><b>${a.scholarship}</b><br><span>${a.name} • ${a.id} • ${a.typeLabel}</span></div>
      <div><span>Trạng thái: <b>Đã gửi</b><br>${a.submittedAt}</span></div>
    </div>`).join('');
}

document.querySelectorAll('.apply-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    scholarshipSelect.value=btn.dataset.scholarship||'';
    document.getElementById('nop-ho-so').scrollIntoView({behavior:'smooth'});
  });
});

document.getElementById('saveDraft').addEventListener('click',()=>{
  const d=formDataObject();
  localStorage.setItem(draftKey,JSON.stringify(d));
  showStatus('✅ Đã lưu hồ sơ nháp trên trình duyệt. Bạn có thể quay lại chỉnh sửa và gửi sau.');
});

document.getElementById('clearDraft').addEventListener('click',()=>{
  localStorage.removeItem(draftKey);
  form.reset();
  document.querySelector('input[name="profile"][value="học sinh"]').checked=true;
  showStatus('🗑️ Đã xóa hồ sơ nháp trên thiết bị này.');
});

form.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.checkValidity()){form.reportValidity();return;}
  const d=formDataObject();
  const apps=JSON.parse(localStorage.getItem(applicationsKey)||'[]');
  const code='ONB-'+Date.now().toString().slice(-8);
  apps.unshift({
    ...d,
    code,
    typeLabel:applicationType.options[applicationType.selectedIndex].text,
    submittedAt:new Date().toLocaleString('vi-VN')
  });
  localStorage.setItem(applicationsKey,JSON.stringify(apps));
  localStorage.removeItem(draftKey);
  showStatus('🎉 Gửi hồ sơ thành công trên bản demo! Mã hồ sơ của bạn: '+code+'. Hệ thống thật cần kết nối máy chủ để cán bộ Oxford Nhà Bè tiếp nhận và xét duyệt hồ sơ.');
  renderApplications();
});

const saved=JSON.parse(localStorage.getItem(draftKey)||'null');
if(saved)fillForm(saved);
renderApplications();
