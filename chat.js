(function(){
  function init(){
    if(document.querySelector('.chat-launcher')) return;
    var launcher=document.createElement('a');
    launcher.className='chat-launcher';
    launcher.href='./community.html';
    launcher.setAttribute('aria-label','Mở Cộng đồng Oxford Nhà Bè');
    launcher.title='Mở Cộng đồng Oxford Nhà Bè';
    launcher.innerHTML='💬';
    document.body.appendChild(launcher);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
