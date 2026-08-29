const key="oxford_nhabe_community_posts";
const defaultPosts=[
 {id:1,title:"Kinh nghiệm ôn thi hiệu quả",category:"hoc-tap",author:"Sinh viên Oxford Nhà Bè",content:"Chia sẻ cách lập kế hoạch ôn tập, chia thời gian theo từng môn và giữ tiến độ mỗi tuần.",likes:12,comments:["Mình thấy cách chia theo tuần rất dễ theo dõi."]},
 {id:2,title:"Hoạt động cộng đồng tháng này",category:"su-kien",author:"Ban Cộng đồng",content:"Cập nhật các hoạt động giao lưu, workshop và chương trình dành cho học sinh, sinh viên.",likes:8,comments:[]},
 {id:3,title:"Tìm thành viên cho CLB",category:"clb",author:"Oxford Student Club",content:"CLB đang tìm các bạn quan tâm truyền thông, sự kiện và nội dung số.",likes:15,comments:[]}
];
let posts=JSON.parse(localStorage.getItem(key)||"null")||defaultPosts;
const postsEl=document.getElementById("posts"), search=document.getElementById("search"), category=document.getElementById("category");

function save(){localStorage.setItem(key,JSON.stringify(posts))}
function render(){
 const q=search.value.toLowerCase().trim(), c=category.value;
 const list=posts.filter(p=>(c==="all"||p.category===c)&&(!q||(p.title+" "+p.content+" "+p.author).toLowerCase().includes(q)));
 if(!list.length){postsEl.innerHTML='<div class="empty">Không tìm thấy bài viết phù hợp.</div>';return}
 postsEl.innerHTML=list.map(p=>`
 <article class="post">
  <h3>${escapeHtml(p.title)}</h3>
  <div class="meta">${escapeHtml(p.author)} · ${label(p.category)}</div>
  <p>${escapeHtml(p.content)}</p>
  <div class="post-actions">
   <button onclick="likePost(${p.id})">♡ Thích (${p.likes||0})</button>
  </div>
  <div class="comments">
   <b>Bình luận</b>
   ${(p.comments||[]).map(x=>`<div class="comment">${escapeHtml(x)}</div>`).join("")}
   <div class="comment-input"><input id="c-${p.id}" placeholder="Viết bình luận..."><button onclick="commentPost(${p.id})">Gửi</button></div>
  </div>
 </article>`).join("");
}
function label(c){return ({'hoc-tap':'Học tập','su-kien':'Sự kiện','clb':'CLB & hoạt động','kinh-nghiem':'Kinh nghiệm'})[c]||c}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m])}
window.likePost=id=>{const p=posts.find(x=>x.id===id);if(p){p.likes=(p.likes||0)+1;save();render()}}
window.commentPost=id=>{const input=document.getElementById("c-"+id);if(input&&input.value.trim()){posts.find(x=>x.id===id).comments.push(input.value.trim());save();render()}}
search.addEventListener("input",render);category.addEventListener("change",render);

const box=document.getElementById("postFormBox");
document.getElementById("newPostBtn").onclick=()=>{box.classList.remove("hidden");box.scrollIntoView({behavior:"smooth"})};
document.getElementById("cancelBtn").onclick=()=>box.classList.add("hidden");
document.getElementById("postForm").onsubmit=e=>{
 e.preventDefault();
 const p={id:Date.now(),title:document.getElementById("title").value.trim(),category:document.getElementById("postCategory").value,author:"Người dùng Oxford Nhà Bè",content:document.getElementById("content").value.trim(),likes:0,comments:[]};
 posts.unshift(p);save();e.target.reset();box.classList.add("hidden");render();
};
render();