document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('submit', e => {e.preventDefault(); window.demoNotice();}, true);
  document.addEventListener('click', e => {
    const node = e.target.closest('a,button,[role=button]'); if(!node) return;
    if(node.hasAttribute('data-demo-disabled')) {e.preventDefault();window.demoNotice();return;}
    const label = [node.textContent,node.title,node.getAttribute('aria-label'),node.getAttribute('data-bs-original-title')].filter(Boolean).join(' ');
    if(node.matches('.btn-quick-view')) {
      const card=node.closest('.product-wrap,.product-item,.product-grid');
      const link=card?.querySelector('a[href*="products/"]');
      if(link){location.href=link.href;return;}
    }
    if(/Add To Cart|Buy Now|Add To Favorites|登录|注册|验证码|重置密码|查.*订单/.test(label) && node.tagName!=='A') {e.preventDefault();window.demoNotice();return;}
    if(/切换到.*模式/.test(label) || (node.closest('nav') && node.querySelector('svg.lucide-sun,svg.lucide-moon'))) {document.documentElement.classList.toggle('dark');return;}
    if(node.matches('.quantity-reduce,.quantity-increase')) {const field=node.parentElement.querySelector('input');if(field) field.value=Math.max(1,(Number(field.value)||1)+(node.matches('.quantity-increase')?1:-1));return;}
    if(node.matches('.swiper-pagination-bullet')) return;
    if(node.matches('button') && !node.textContent.trim() && node.parentElement.querySelector('input[type=password],input[data-demo-password]')) {
      const input=node.parentElement.querySelector('input');input.dataset.demoPassword='true';input.type=input.type==='password'?'text':'password';return;
    }
    if(node.matches('button') && /ZH|🇨🇳|^简$/.test(label.trim())) {window.demoNotice('此静态快照保留原站当前展示语言。');}
  });
  // Keep original Bootstrap tabs, drop-downs and mobile navigation operational.
  if(window.Swiper) document.querySelectorAll('.swiper,.swiper-container').forEach(el=>{
    el.querySelectorAll('.swiper-slide-duplicate').forEach(x=>x.remove());
    el.classList.remove('swiper-initialized');
    el.querySelectorAll('.swiper-wrapper,.swiper-slide').forEach(x=>{x.style.transform='';x.style.width='';x.style.opacity='';});
    const isHero=el.className.includes('swiper-img-text');
    new Swiper(el,{loop:isHero,slidesPerView:isHero?1:'auto',spaceBetween:isHero?0:12,effect:isHero?'fade':'slide',pagination:{el:el.querySelector('.swiper-pagination')||el.parentElement.querySelector('[class*=slideshow-pagination]'),clickable:true},navigation:{nextEl:el.querySelector('.swiper-button-next'),prevEl:el.querySelector('.swiper-button-prev')}});
  });
  // Empty original lists stay empty; searching them never contacts the original service.
  document.querySelectorAll('input[placeholder*=搜索]').forEach(el=>el.addEventListener('input',()=>{}));
});
