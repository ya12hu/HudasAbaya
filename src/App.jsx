import { useState, useEffect, useRef } from "react";

// ─── Translations ────────────────────────────────────────────────
const T = {
  en: {
    store:"Store", admin:"Admin", langBtn:"عربي",
    collection:"Our Collection", subtitle:"MODEST · PREMIUM · FREE US SHIPPING",
    search:"Search products...", outOfStock:"Out of Stock", addToCart:"Add to Cart",
    soldOut:"Sold Out", addedToCart:"✓ Added", back:"← Back",
    shoppingBag:"Shopping Bag", emptyBag:"Your bag is empty",
    continueShopping:"Continue Shopping", subtotal:"Subtotal",
    shipping:"Shipping", freeShip:"FREE 🇺🇸", total:"Total", checkout:"Checkout →",
    shippingInfo:"Shipping Info", payment:"Payment",
    fullName:"Full Name", email:"Email", phone:"Phone (optional)",
    addr1:"Address Line 1", addr2:"Apt/Suite (optional)",
    city:"City", state:"State", zip:"ZIP Code",
    contPayment:"Continue to Payment →", secPay:"🔒 Secure payment via PayPal",
    thankYou:"Thank You!", orderConf:"Your order is confirmed.",
    shipTo:"Shipping to", fillFields:"Please fill Name, Email, Address, City, ZIP.",
    ppNotConf:"PayPal Not Configured", ppHint:"Go to Admin → Settings and enter your PayPal Client ID.",
    allCategories:"All", hijabMagnets:"Hijab Magnets", printedModal:"Printed Modal Hijab",
    noResults:"No products found", filterBy:"Filter by",
    adminPanel:"Admin Panel", products:"Products", pricing:"Pricing & Discounts",
    orders:"Orders", settings:"Settings", logout:"Logout",
    productName:"Product Name", price:"Price ($)", discount:"Discount (%)",
    discountExpiry:"Discount Expiry", categoryDiscount:"Category Discount (%)",
    couponCode:"Coupon Code", couponDiscount:"Coupon Discount (%)",
    buyX:"Buy X Get Discount", buyXQty:"Min Quantity", buyXDisc:"Discount (%)",
    shipping_price:"Shipping Price ($)", freeShipOver:"Free Shipping Over ($)",
    save:"Save", saved:"✓ Saved", taxRate:"Tax Rate (%)",
    active:"Active", inactive:"Inactive", toggle:"Toggle",
    wishlist:"Wishlist", addWishlist:"♡ Save", removeWishlist:"♥ Saved",
    youMayLike:"You May Also Like",
    newArrival:"New Arrival", sale:"SALE",
    passwordLabel:"Admin Password", login:"Login", wrongPass:"Wrong password",
    orderId:"Order ID", orderDate:"Date", orderStatus:"Status", orderTotal:"Total",
    pending:"Pending", shipped:"Shipped", delivered:"Delivered",
    exportCSV:"Export CSV", noOrders:"No orders yet",
    completeLook:"Complete the Look", completeLookSub:"You may also like this:",
    yesAdd:"Yes, add it", noThanks:"No thanks",
  },
  ar: {
    store:"المتجر", admin:"الإدارة", langBtn:"English",
    collection:"مجموعتنا", subtitle:"محتشم · فاخر · شحن مجاني داخل أمريكا",
    search:"ابحثي عن منتج...", outOfStock:"نفذ المخزون", addToCart:"أضيفي للسلة",
    soldOut:"نفذ", addedToCart:"✓ تمت الإضافة", back:"→ رجوع",
    shoppingBag:"سلة التسوق", emptyBag:"سلتك فارغة",
    continueShopping:"تابعي التسوق", subtotal:"المجموع",
    shipping:"الشحن", freeShip:"مجاني 🇺🇸", total:"الإجمالي", checkout:"إتمام الطلب ←",
    shippingInfo:"بيانات الشحن", payment:"الدفع",
    fullName:"الاسم الكامل", email:"البريد الإلكتروني", phone:"الهاتف (اختياري)",
    addr1:"العنوان", addr2:"شقة/جناح (اختياري)",
    city:"المدينة", state:"الولاية", zip:"الرمز البريدي",
    contPayment:"← المتابعة للدفع", secPay:"🔒 دفع آمن عبر PayPal",
    thankYou:"شكراً لك!", orderConf:"تم تأكيد طلبك.",
    shipTo:"الشحن إلى", fillFields:"يرجى تعبئة الاسم والبريد والعنوان والمدينة والرمز البريدي.",
    ppNotConf:"PayPal غير مُفعّل", ppHint:"اذهبي إلى الإدارة ← الإعدادات وأدخلي Client ID الخاص بـ PayPal.",
    allCategories:"الكل", hijabMagnets:"مغناطيسات الحجاب", printedModal:"حجاب مودال مطبوع",
    noResults:"لا توجد منتجات", filterBy:"تصفية",
    adminPanel:"لوحة التحكم", products:"المنتجات", pricing:"التسعير والخصومات",
    orders:"الطلبات", settings:"الإعدادات", logout:"خروج",
    productName:"اسم المنتج", price:"السعر ($)", discount:"الخصم (%)",
    discountExpiry:"انتهاء الخصم", categoryDiscount:"خصم الفئة (%)",
    couponCode:"كود الخصم", couponDiscount:"نسبة كود الخصم (%)",
    buyX:"اشتري X واحصلي على خصم", buyXQty:"الحد الأدنى للكمية", buyXDisc:"الخصم (%)",
    shipping_price:"سعر الشحن ($)", freeShipOver:"شحن مجاني فوق ($)",
    save:"حفظ", saved:"✓ تم الحفظ", taxRate:"نسبة الضريبة (%)",
    active:"فعال", inactive:"غير فعال", toggle:"تفعيل/إيقاف",
    wishlist:"المفضلة", addWishlist:"♡ حفظ", removeWishlist:"♥ محفوظ",
    youMayLike:"قد يعجبك أيضاً",
    newArrival:"وصل حديثاً", sale:"تخفيض",
    passwordLabel:"كلمة مرور الإدارة", login:"دخول", wrongPass:"كلمة المرور خاطئة",
    orderId:"رقم الطلب", orderDate:"التاريخ", orderStatus:"الحالة", orderTotal:"الإجمالي",
    pending:"قيد المعالجة", shipped:"تم الشحن", delivered:"تم التسليم",
    exportCSV:"تصدير CSV", noOrders:"لا توجد طلبات بعد",
    completeLook:"كمّلي الإطلالة", completeLookSub:"تريدين تضيفين هذا معه؟",
    yesAdd:"أي، ضيفيه", noThanks:"لا شكراً",
  }
};

// ─── Default Products ────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  // Hijab Magnets
  ...Array.from({length:7}, (_,i) => ({
    id:`hm${i+1}`, category:"hijabMagnets",
    name:"Hijab Magnets", nameAr:"مغناطيسات الحجاب",
    image:[
      "https://i.ibb.co/XxwzWcfx/4f077dda-bfe8-4caf-a5cf-7e98e0219809.jpg",
      "https://i.ibb.co/fV5V1LNr/59d532c3-0df9-4d22-aaac-582bedda299e.jpg",
      "https://i.ibb.co/ycjhHcWP/c61fdd09-b65a-4339-8705-59622a09dbf3.jpg",
      "https://i.ibb.co/63M3fg4/7752032a-e061-4b04-8354-5425ee73c3d4.jpg",
      "https://i.ibb.co/v6GRbW9J/8aff60db-b97a-4177-8fc2-9c9e3d471b44.jpg",
      "https://i.ibb.co/xtm1HY7m/e7676763-8d38-47e9-a8e8-04aef4396567.jpg",
      "https://i.ibb.co/FkhTQpPf/932ab27d-0f0e-471c-a833-3f6c7b500a0f.jpg",
    ][i],
    price:5, discount:0, active:true, newArrival:true, stock:99,
  })),
  // Printed Modal Hijab
  ...Array.from({length:56}, (_,i) => ({
    id:`pm${i+1}`, category:"printedModal",
    name:"Printed Modal Hijab", nameAr:"حجاب مودال مطبوع",
    image:[
      "https://i.ibb.co/bM0cjjq5/f5ea53ec-8263-4d1f-8967-2bcbddaf9ba5.jpg",
      "https://i.ibb.co/zTgjLfpG/f4119047-764b-4d77-a5b8-b4ced689f18a.jpg",
      "https://i.ibb.co/3ysNwStG/f1b9dc70-63fd-4ec4-a88c-3b0016c3ab21.jpg",
      "https://i.ibb.co/R4QJFw5x/f7679aa1-d9ef-47a2-beee-62feff98cb06.jpg",
      "https://i.ibb.co/RVSR2xF/eb4fd29f-64d8-44cc-add4-0c7fb4ce0579.jpg",
      "https://i.ibb.co/zTWQbgVp/e9e78bd4-097f-497f-b58d-a0ebb60a4c83.jpg",
      "https://i.ibb.co/7t2ndx7Q/d627db9b-df0e-4777-aa8e-3d5c45aa4165.jpg",
      "https://i.ibb.co/G3WnpfNL/d629a311-51ab-43f1-9308-c708713de4bb.jpg",
      "https://i.ibb.co/hJYhvWYM/eadb9dbf-8b1c-478d-bb5b-d40eb581ac79.jpg",
      "https://i.ibb.co/tTyn2d3g/c4847879-4ee8-4e99-93a1-4ecdb7351528.jpg",
      "https://i.ibb.co/4gfRWhsL/c1989f9c-1810-48a7-ad65-f2bb040423e0.jpg",
      "https://i.ibb.co/27x5gc72/cb66f118-b296-4dae-be12-5839d00ea75b.jpg",
      "https://i.ibb.co/v60qwBDJ/c319dd09-0369-4478-b53f-eff857e04e0d.jpg",
      "https://i.ibb.co/mVVy0thK/bff42198-8987-4cd6-bc9b-866e979084c0.jpg",
      "https://i.ibb.co/WdsbKCj/c0ea572f-b62e-4c0e-8b94-1a832011a251.jpg",
      "https://i.ibb.co/whGC3QyM/bf50e250-4846-4aa9-bb68-72a5feec39f9.jpg",
      "https://i.ibb.co/RkMQpSX4/abd18f82-7c4a-4b49-80e4-cc4c8689360f.jpg",
      "https://i.ibb.co/nMytjX4s/b44669c3-675b-46fa-a592-80685b908270.jpg",
      "https://i.ibb.co/jv0GZwXN/bc2697d6-cff4-436b-b10d-7c8a5daf9f72.jpg",
      "https://i.ibb.co/b5QqVbv1/aa0b5a9b-5948-4223-806f-e2d1c012b30c.jpg",
      "https://i.ibb.co/67j5R4bS/b9d929fa-88dd-4a18-b72c-bb62a08d8bd4.jpg",
      "https://i.ibb.co/QGc4qFB/99090874-8e43-4e2c-8304-6a159d4b93e0.jpg",
      "https://i.ibb.co/ycKbtmLv/12977973-929e-4d02-b8da-a808213dc8b3.jpg",
      "https://i.ibb.co/99YHy6jP/a0e937c6-7e76-4b06-8fad-c949d3ce28a7.jpg",
      "https://i.ibb.co/4ZgVfyxX/3419989d-e399-4e44-9d9f-c04ac2523b95.jpg",
      "https://i.ibb.co/4wMHP7f1/194811d3-9633-4e77-8839-b209b2d87e81.jpg",
      "https://i.ibb.co/1t0ZnSbS/84948e22-6d49-47d5-b18c-309c0ddc90cd.jpg",
      "https://i.ibb.co/PZYD9dxV/95754b03-b401-4722-8311-fd37e7910299.jpg",
      "https://i.ibb.co/4nRT4Zf1/528265e2-e4c7-4eee-8880-ffe6f25b8e15.jpg",
      "https://i.ibb.co/DDrwtsFZ/78944ae3-fcd4-4c94-a5a3-558abb0fbb9b.jpg",
      "https://i.ibb.co/GQqr5L9r/51275dcf-d088-4f50-bd9a-4e589dd8fc0f.jpg",
      "https://i.ibb.co/LdtDVTFg/25677c25-a8c6-4602-897e-910520702e1f.jpg",
      "https://i.ibb.co/jZv479r0/5103b08d-5cc4-4b58-ace8-5e1549628cf5.jpg",
      "https://i.ibb.co/W4HWG6zp/3927bdbc-4796-42a1-8657-390273b55e2e.jpg",
      "https://i.ibb.co/nsm8MsjD/8777f762-8d4b-4c51-b117-3316575b180b.jpg",
      "https://i.ibb.co/4n77YfTT/6413d8ac-7b18-4949-93d6-e2ab1e2cf207.jpg",
      "https://i.ibb.co/RTYb6xb2/982cd674-8f98-457e-92d5-fc5bfcb87639.jpg",
      "https://i.ibb.co/RTt3bpVC/1501bf11-8f03-4691-a0d6-3f5aef286888.jpg",
      "https://i.ibb.co/B27CWt2C/482ae491-1a0a-493a-84e4-4c457e23461c.jpg",
      "https://i.ibb.co/S4Xh3Wxr/145dc1cc-fd50-4cf9-982a-7015272ba074.jpg",
      "https://i.ibb.co/21NHqsZG/248a7214-2902-4d63-8086-51b80287287b.jpg",
      "https://i.ibb.co/dsZ8GssK/389f3692-562f-4034-9cbe-94c82c2c26aa.jpg",
      "https://i.ibb.co/G3nVZZJC/57e13014-d834-41e2-8a98-c3cdaa60f4a0.jpg",
      "https://i.ibb.co/35vWKM0Z/216b9b49-1c47-43be-be72-c0d055363ea8.jpg",
      "https://i.ibb.co/gZcNHf3L/9db118bd-b6eb-4f5d-8655-b98f6ba6768b.jpg",
      "https://i.ibb.co/5hNJ0fkj/9ad97880-3b12-4be9-8f53-5aa807605968.jpg",
      "https://i.ibb.co/BHG0GMsm/6ff22137-1b65-4378-b8a9-2a55d60d7609.jpg",
      "https://i.ibb.co/5Xc5SKq4/7bbe036f-e098-4763-8bfb-b9503a42ee9b.jpg",
      "https://i.ibb.co/CKLfm1hs/2f87ce8f-b25d-4b24-a395-2fbacc086ceb.jpg",
      "https://i.ibb.co/4h1xy6R/3e24b8f1-84fd-49b3-8e7e-38b00f78df3a.jpg",
      "https://i.ibb.co/5W1GN24v/8b520cdc-9fd3-4c1e-b1e7-bd0d8a90ceaf.jpg",
      "https://i.ibb.co/CRV5nfL/1fe1f17f-d3f2-4184-8d2c-36848385de05.jpg",
      "https://i.ibb.co/WWtLjv3G/0d2c6b9e-e4c1-47ab-9894-947c3b6fc8a9.jpg",
      "https://i.ibb.co/4wm0CZGR/02bf38fb-0b92-4ac3-bffd-4c0c94f25e9f.jpg",
      "https://i.ibb.co/5m9t5g9/0b889236-99da-41df-a18b-3a36d05da210.jpg",
      "https://i.ibb.co/SDjdK4Mh/3cd4cd1c-6002-463e-8098-fbac85d984e6.jpg",
    ][i],
    price:20, discount:0, active:true, newArrival:false, stock:99,
  })),
];

const DEFAULT_SETTINGS = {
  paypalClientId:"", storeName:"Huda's Abaya Boutique", storeTagline:"",
  whatsapp:"", snapchat:"hudas_abaya_boutique", instagram:"hudas_abaya_boutique", tiktok:"hudas.abaya",
  shippingPrice:0, freeShipOver:50, taxRate:0, adminPassword:"huda2024",
  couponCode:"", couponDiscount:0, couponActive:false,
  buyXQty:2, buyXDisc:10, buyXActive:false,
  categoryDiscounts:{ hijabMagnets:0, printedModal:0 },
};

const LS = {
  get:(k,d)=>{ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch{ return d; }},
  set:(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} },
};

function calcPrice(product, settings, qty=1, coupon="") {
  if(!product.price) return 0;
  let price = product.price;
  let disc = product.discount||0;
  const catDisc = settings.categoryDiscounts?.[product.category]||0;
  disc = Math.max(disc, catDisc);
  if(settings.buyXActive && qty>= settings.buyXQty) disc = Math.max(disc, settings.buyXDisc);
  let couponDisc = 0;
  if(settings.couponActive && coupon && coupon.toUpperCase()===settings.couponCode.toUpperCase()) couponDisc = settings.couponDiscount||0;
  disc = Math.min(disc+couponDisc, 100);
  return price*(1-disc/100);
}

function AdminPasswordInput({styles, placeholder, onSubmit}){
  const [val, setVal] = useState("");
  return (
    <input
      type="password"
      autoFocus
      style={styles.input}
      placeholder={placeholder}
      value={val}
      onChange={e=>setVal(e.target.value)}
      onKeyDown={e=>{ if(e.key==="Enter") onSubmit(val); }}
      onBlur={()=>onSubmit(val,true)}
    />
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const isRTL = lang==="ar";
  const [pageKey, setPageKey] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const [products, setProducts] = useState(()=>LS.get("huda_products", DEFAULT_PRODUCTS));
  const [settings, setSettings] = useState(()=>LS.get("huda_settings", DEFAULT_SETTINGS));
  const [orders, setOrders] = useState(()=>LS.get("huda_orders",[]));
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(()=>LS.get("huda_wishlist",[]));
  const [page, setPage] = useState("shop"); // shop | product | cart | checkout | confirm | admin
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [adminTab, setAdminTab] = useState("products");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminPassErr, setAdminPassErr] = useState(false);
  const [shippingForm, setShippingForm] = useState({name:"",email:"",phone:"",addr1:"",addr2:"",city:"",state:"",zip:""});
  const [formError, setFormError] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [savedMsg, setSavedMsg] = useState({});
  const IMG_FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400'><rect width='300' height='400' fill='#f0ece4'/><text x='150' y='205' font-family='sans-serif' font-size='14' fill='#b8a98f' text-anchor='middle'>Huda's Abaya</text></svg>`
  );
  const onImgErr = (e)=>{ if(e.currentTarget.src!==IMG_FALLBACK){ e.currentTarget.src = IMG_FALLBACK; } };
  const [addedMap, setAddedMap] = useState({});
  const [confirmOrder, setConfirmOrder] = useState(null);
  const [crossSell, setCrossSell] = useState(null);
  const [winWidth, setWinWidth] = useState(typeof window!=="undefined"?window.innerWidth:375);
  const [heroImgIdx, setHeroImgIdx] = useState(0);
  const heroImages = products.filter(p=>p.category==="printedModal").slice(0,4).map(p=>p.image);
  useEffect(()=>{
    if(heroImages.length===0) return;
    const iv = setInterval(()=>setHeroImgIdx(i=>(i+1)%heroImages.length), 2200);
    return ()=>clearInterval(iv);
  },[heroImages.length]);
  useEffect(()=>{
    let raf=null;
    const onResize=()=>{
      if(raf) return;
      raf = requestAnimationFrame(()=>{ setWinWidth(window.innerWidth); raf=null; });
    };
    window.addEventListener("resize",onResize,{passive:true});
    return ()=>{ window.removeEventListener("resize",onResize); if(raf) cancelAnimationFrame(raf); };
  },[]);
  const gridCols = winWidth<420 ? 2 : winWidth<640 ? 3 : winWidth<1000 ? 4 : 5;

  useEffect(()=>{ LS.set("huda_products",products); },[products]);
  useEffect(()=>{ LS.set("huda_settings",settings); },[settings]);
  useEffect(()=>{ LS.set("huda_orders",orders); },[orders]);
  useEffect(()=>{ LS.set("huda_wishlist",wishlist); },[wishlist]);

  const cartTotal = cart.reduce((s,i)=>s+calcPrice(products.find(p=>p.id===i.id)||{price:0,discount:0,category:""},settings,i.qty,couponInput)*i.qty,0);
  const shippingCost = cartTotal>=settings.freeShipOver ? 0 : settings.shippingPrice||0;
  const tax = cartTotal*(settings.taxRate||0)/100;
  const orderTotal = cartTotal+shippingCost+tax;

  const [flyItem, setFlyItem] = useState(null); // {img, x, y, tx, ty}
  const [cartPulse, setCartPulse] = useState(false);
  const cartBtnRef = useRef(null);

  function addToCart(prod, evt=null, sourceEl=null) {
    setCart(c=>{
      const ex=c.find(x=>x.id===prod.id);
      if(ex) return c.map(x=>x.id===prod.id?{...x,qty:x.qty+1}:x);
      return [...c,{id:prod.id,qty:1}];
    });
    setAddedMap(m=>({...m,[prod.id]:true}));
    setTimeout(()=>setAddedMap(m=>({...m,[prod.id]:false})),1500);
    if(prod.category==="printedModal"){
      const magnetHasNone = !cart.some(c=>{
        const cp = products.find(x=>x.id===c.id);
        return cp && cp.category==="hijabMagnets";
      });
      if(magnetHasNone){
        const magnets = products.filter(p=>p.active && p.category==="hijabMagnets" && !cart.find(c=>c.id===p.id));
        if(magnets.length>0) setCrossSell(magnets[Math.floor(Math.random()*magnets.length)]);
      }
    }
    // Fly-to-cart animation — origin is the actual product image the person clicked from
    let imgEl = sourceEl || null;
    if(!imgEl && evt){
      const cardEl = evt.currentTarget.closest("[data-card]") || evt.currentTarget;
      imgEl = (cardEl.tagName==="IMG") ? cardEl : (cardEl.querySelector ? cardEl.querySelector("img") : null) || cardEl;
    }
    if(imgEl && cartBtnRef.current){
      const startRect = imgEl.getBoundingClientRect();
      const endRect = cartBtnRef.current.getBoundingClientRect();
      const size = 52;
      const flyId = Date.now();
      setFlyItem({
        id:flyId, img:prod.image,
        x:startRect.left+startRect.width/2-size/2,
        y:startRect.top+startRect.height/2-size/2,
        tx:(endRect.left+endRect.width/2)-(startRect.left+startRect.width/2),
        ty:(endRect.top+endRect.height/2)-(startRect.top+startRect.height/2),
      });
      setTimeout(()=>{
        setFlyItem(f=>f&&f.id===flyId?null:f);
        setCartPulse(true);
        setTimeout(()=>setCartPulse(false), 380);
      }, 580);
    } else {
      setCartPulse(true);
      setTimeout(()=>setCartPulse(false), 380);
    }
  }

  function removeFromCart(id){ setCart(c=>c.filter(x=>x.id!==id)); }
  function updateQty(id,qty){ if(qty<1){removeFromCart(id);return;} setCart(c=>c.map(x=>x.id===id?{...x,qty}:x)); }
  function toggleWishlist(id){ setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]); }

  const visibleProducts = products.filter(p=>{
    if(!p.active) return false;
    if(categoryFilter!=="all" && p.category!==categoryFilter) return false;
    if(search) {
      const s=search.toLowerCase();
      const nm=(lang==="ar"?p.nameAr:p.name).toLowerCase();
      if(!nm.includes(s)) return false;
    }
    return true;
  });

  function saveAdmin(key,val){ setSavedMsg(m=>({...m,[key]:true})); setTimeout(()=>setSavedMsg(m=>({...m,[key]:false})),2000); }

  function updateProduct(id,field,val){
    setProducts(ps=>ps.map(p=>p.id===id?{...p,[field]:val}:p));
  }
  function updateSetting(field,val){ setSettings(s=>({...s,[field]:val})); }
  function updateCatDisc(cat,val){ setSettings(s=>({...s,categoryDiscounts:{...s.categoryDiscounts,[cat]:val}})); }

  function placeOrder(ppDetails=null){
    const order = {
      id:"ORD-"+Date.now(),
      date:new Date().toLocaleDateString(),
      items:[...cart],
      shipping:shippingForm,
      total:orderTotal.toFixed(2),
      status:"pending",
      paypal:ppDetails,
    };
    setOrders(o=>[...o,order]);
    if(settings.whatsapp){
      const msg=encodeURIComponent(`New Order ${order.id}\nTotal: $${order.total}\nShip to: ${shippingForm.name}, ${shippingForm.city}`);
      window.open(`https://wa.me/${settings.whatsapp}?text=${msg}`,"_blank");
    }
    setConfirmOrder(order);
    setCart([]);
    setPage("confirm");
  }

  function exportCSV(){
    const rows=[["Order ID","Date","Name","City","Total","Status"],...orders.map(o=>[o.id,o.date,o.shipping?.name,o.shipping?.city,o.total,o.status])];
    const csv=rows.map(r=>r.join(",")).join("\n");
    const a=document.createElement("a"); a.href="data:text/csv,"+encodeURIComponent(csv); a.download="orders.csv"; a.click();
  }

  const styles = {
    app:{ fontFamily:"'Cormorant Garamond',serif", background:"#faf9f7", minHeight:"100vh", direction:isRTL?"rtl":"ltr", WebkitOverflowScrolling:"touch", overscrollBehaviorY:"none", touchAction:"manipulation", WebkitTapHighlightColor:"transparent" },
    header:{ background:"#1a1a1a", color:"#fff", padding:"0 20px", position:"sticky", top:0, zIndex:100 },
    announceBar:{ background:"#c4a56a", color:"#1a1a1a", overflow:"hidden", whiteSpace:"nowrap", padding:"7px 0", fontSize:".78rem", fontWeight:700, letterSpacing:".04em" },
    announceTrack:{ display:"inline-block", paddingLeft:"100%", animation:"huda-marquee 22s linear infinite" },
    headerTop:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid #333" },
    logoCircle:{ width:76, height:76, borderRadius:"50%", overflow:"hidden", border:"2px solid #c4a56a", flexShrink:0, boxShadow:"0 4px 16px rgba(196,165,106,.35)", background:"#1a1a1a" },
    logoCircleImg:{ width:"100%", height:"100%", objectFit:"cover" },
    brandRow:{ display:"flex", alignItems:"center", gap:12 },
    brandText:{ display:"flex", flexDirection:"column" },
    headerBottom:{ display:"flex", gap:20, padding:"10px 0", overflowX:"auto" },
    logo:{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.1rem,4vw,1.6rem)", letterSpacing:".08em", fontWeight:600, color:"#c4a56a", whiteSpace:"nowrap" },
    tagline:{ fontSize:".6rem", color:"#888", letterSpacing:".2em", marginTop:2 },
    navBtn:{ background:"none", border:"none", color:"#ccc", cursor:"pointer", fontSize:".85rem", letterSpacing:".08em", padding:"4px 8px", whiteSpace:"nowrap" },
    navBtnActive:{ color:"#c4a56a", borderBottom:"2px solid #c4a56a" },
    cartBtn:{ background:"#c4a56a", color:"#1a1a1a", border:"none", borderRadius:24, padding:"9px 18px", cursor:"pointer", fontSize:".85rem", fontWeight:800, boxShadow:"0 3px 12px rgba(196,165,106,.4)" },
    hero:{ background:"#0f0c0a", color:"#fff", textAlign:"center", padding:"90px 20px 70px", position:"relative", overflow:"hidden", minHeight:420 },
    heroBg:{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0, transform:"scale(1.06)", transition:"opacity 1.4s cubic-bezier(.4,0,.2,1), transform 6s ease-out" },
    heroBgActive:{ opacity:.38, transform:"scale(1)" },
    heroOverlay:{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(15,12,10,.55) 0%,rgba(15,12,10,.75) 60%,rgba(15,12,10,.95) 100%)" },
    heroContent:{ position:"relative", zIndex:2 },
    heroTitle:{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,5vw,3.5rem)", letterSpacing:".15em", color:"#c4a56a", marginBottom:8 },
    heroSub:{ fontSize:".75rem", letterSpacing:".2em", color:"#aaa", marginBottom:30 },
    shopBtn:{ background:"linear-gradient(135deg,#c4a56a,#d4b57a)", color:"#fff", border:"none", borderRadius:30, padding:"12px 32px", fontSize:"1rem", cursor:"pointer", letterSpacing:".1em" },
    filterBar:{ display:"flex", gap:10, padding:"16px 20px", background:"#fff", borderBottom:"1px solid #eee", overflowX:"auto", alignItems:"center", flexWrap:"wrap" },
    filterBtn:{ background:"none", border:"1px solid #ddd", borderRadius:20, padding:"6px 14px", cursor:"pointer", fontSize:".8rem", whiteSpace:"nowrap" },
    filterBtnActive:{ background:"#1a1a1a", color:"#fff", border:"1px solid #1a1a1a" },
    searchInput:{ border:"1px solid #ddd", borderRadius:20, padding:"6px 16px", fontSize:".85rem", outline:"none", minWidth:180 },
    grid:{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8, padding:10 },
    card:{ background:"#fff", borderRadius:12, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,.06)", cursor:"pointer", transition:"transform .2s,box-shadow .2s" },
    cardImg:{ width:"100%", aspectRatio:"3/4", objectFit:"cover" },
    cardBody:{ padding:"7px" },
    cardName:{ fontFamily:"'Cormorant Garamond',serif", fontSize:".78rem", fontWeight:600, marginBottom:2, color:"#1a1a1a", lineHeight:1.15, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
    cardPrice:{ color:"#c4a56a", fontWeight:700, fontSize:".78rem" },
    cardPriceOrig:{ color:"#999", textDecoration:"line-through", fontSize:".72rem", marginLeft:5 },
    addBtn:{ width:"100%", background:"#1a1a1a", color:"#fff", border:"none", borderRadius:5, padding:"5px", cursor:"pointer", fontSize:".64rem", fontWeight:700, letterSpacing:".02em", marginTop:5 },
    addBtnAdded:{ background:"#2d7a2d" },
    badge:{ position:"absolute", top:8, left:8, background:"#c4a56a", color:"#fff", fontSize:".65rem", padding:"2px 8px", borderRadius:10, fontWeight:700 },
    saleBadge:{ position:"absolute", top:8, right:8, background:"#e53935", color:"#fff", fontSize:".65rem", padding:"2px 8px", borderRadius:10, fontWeight:700 },
    wishBtn:{ position:"absolute", top:8, right:8, background:"rgba(255,255,255,.9)", border:"none", borderRadius:50, width:30, height:30, cursor:"pointer", fontSize:".9rem", display:"flex", alignItems:"center", justifyContent:"center" },
    // Product detail
    detailWrap:{ maxWidth:900, margin:"0 auto", padding:20, display:"grid", gridTemplateColumns:"1fr 1fr", gap:30 },
    detailImg:{ width:"100%", aspectRatio:"3/4", objectFit:"cover", borderRadius:12 },
    detailName:{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", marginBottom:8 },
    detailPrice:{ color:"#c4a56a", fontSize:"1.5rem", fontWeight:700 },
    detailAddBtn:{ background:"#1a1a1a", color:"#fff", border:"none", borderRadius:8, padding:"14px 32px", cursor:"pointer", fontSize:"1rem", width:"100%", marginTop:16 },
    // Cart
    cartWrap:{ maxWidth:600, margin:"0 auto", padding:20 },
    cartItem:{ display:"flex", gap:12, alignItems:"center", background:"#fff", borderRadius:10, padding:12, marginBottom:12, boxShadow:"0 1px 6px rgba(0,0,0,.06)" },
    cartImg:{ width:70, height:90, objectFit:"cover", borderRadius:8 },
    qtyBtn:{ background:"#f0f0f0", border:"none", borderRadius:4, width:28, height:28, cursor:"pointer", fontSize:"1rem" },
    // Checkout
    checkoutWrap:{ maxWidth:500, margin:"0 auto", padding:20 },
    input:{ width:"100%", border:"1px solid #ddd", borderRadius:8, padding:"10px 12px", fontSize:".9rem", marginBottom:10, boxSizing:"border-box", outline:"none" },
    checkoutBtn:{ width:"100%", background:"#1a1a1a", color:"#fff", border:"none", borderRadius:8, padding:14, cursor:"pointer", fontSize:"1rem", marginTop:8 },
    // Admin
    adminWrap:{ maxWidth:1000, margin:"0 auto", padding:20 },
    adminTabs:{ display:"flex", gap:4, marginBottom:20, borderBottom:"2px solid #eee", paddingBottom:0 },
    adminTab:{ background:"none", border:"none", padding:"10px 16px", cursor:"pointer", fontSize:".9rem", borderBottom:"2px solid transparent", marginBottom:-2 },
    adminTabActive:{ borderBottom:"2px solid #c4a56a", color:"#c4a56a", fontWeight:700 },
    table:{ width:"100%", borderCollapse:"collapse" },
    th:{ background:"#f5f5f5", padding:"10px 12px", textAlign:"left", fontSize:".8rem", color:"#666", fontWeight:600 },
    td:{ padding:"10px 12px", borderBottom:"1px solid #f0f0f0", fontSize:".85rem", verticalAlign:"middle" },
    adminInput:{ border:"1px solid #ddd", borderRadius:6, padding:"6px 10px", fontSize:".85rem", width:90 },
    saveBtn:{ background:"#c4a56a", color:"#fff", border:"none", borderRadius:6, padding:"6px 14px", cursor:"pointer", fontSize:".8rem" },
    pricingCard:{ background:"#fff", borderRadius:12, padding:20, marginBottom:16, boxShadow:"0 1px 8px rgba(0,0,0,.06)" },
    pricingRow:{ display:"flex", alignItems:"center", gap:12, marginBottom:12, flexWrap:"wrap" },
    pricingLabel:{ fontSize:".85rem", color:"#555", minWidth:160 },
    toggle:{ position:"relative", width:44, height:24, background:"#ddd", borderRadius:12, cursor:"pointer", transition:".2s" },
    toggleOn:{ background:"#c4a56a" },
    toggleThumb:{ position:"absolute", width:20, height:20, background:"#fff", borderRadius:10, top:2, left:2, transition:".2s", boxShadow:"0 1px 4px rgba(0,0,0,.2)" },
    toggleThumbOn:{ left:22 },
  };

  // ── Render helpers ──────────────────────────────────────────────
  function getProdName(p){ return lang==="ar"?p.nameAr:p.name; }

  function getFinalPrice(p, qty=1){
    return calcPrice(p, settings, qty, couponInput);
  }

  function ProductCard({p}){
    const finalPrice = getFinalPrice(p);
    const hasDisc = p.discount>0 || (settings.categoryDiscounts?.[p.category]||0)>0;
    const inWishlist = wishlist.includes(p.id);
    const inCartQty = cart.find(x=>x.id===p.id)?.qty || 0;
    return (
      <div data-card style={{...styles.card, position:"relative"}}
        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.12)";}}
        onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,.06)";}}>
        <div style={{position:"relative"}} onClick={()=>{setSelectedProduct(p);setPage("product");window.scrollTo({top:0,behavior:"smooth"});}}>
          <img src={p.image} alt={getProdName(p)} style={styles.cardImg} loading="lazy" onError={onImgErr} />
          {p.newArrival && <span style={styles.badge}>{t.newArrival}</span>}
          {hasDisc && p.price>0 && <span style={styles.saleBadge}>{t.sale}</span>}
        </div>
        <button style={{...styles.wishBtn, right:isRTL?undefined:8, left:isRTL?8:undefined, top:hasDisc&&p.price>0?36:8}}
          onClick={()=>toggleWishlist(p.id)}>
          {inWishlist?"♥":"♡"}
        </button>
        <div style={styles.cardBody}>
          <div style={styles.cardName}>{getProdName(p)}</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            {p.price>0 ? (
              <>
                <span style={styles.cardPrice}>${finalPrice.toFixed(2)}</span>
                {hasDisc && <span style={styles.cardPriceOrig}>${p.price.toFixed(2)}</span>}
              </>
            ) : <span style={{...styles.cardPrice, color:"#999",fontSize:".85rem"}}>Price TBD</span>}
          </div>
          <div style={{position:"relative"}}>
            {inCartQty>0 && (
              <div style={{
                position:"absolute", top:-20, left:"50%", transform:"translateX(-50%)",
                background:"none", color:"#1a1a1a", fontSize:".7rem", fontWeight:800,
                padding:"0", display:"flex", alignItems:"center", gap:3,
                zIndex:2, whiteSpace:"nowrap"
              }}>
                <span>✓</span><span>{inCartQty}</span>
              </div>
            )}
            <button
              style={{...styles.addBtn, ...(addedMap[p.id]?styles.addBtnAdded:{})}}
              onClick={(e)=>{ if(p.stock>0) addToCart(p,e); }}>
              {p.stock===0 ? t.outOfStock : addedMap[p.id] ? t.addedToCart : t.addToCart}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Pages ───────────────────────────────────────────────────────
  function ShopPage(){
    return (
      <>
        {/* Hero */}
        <div style={styles.hero}>
          {heroImages.map((img,i)=>(
            <img key={img} src={img} alt="" loading={i===0?"eager":"lazy"} decoding="async" style={{...styles.heroBg, ...(i===heroImgIdx?styles.heroBgActive:{})}} />
          ))}
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroContent}>
            <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,6vw,3.2rem)", fontWeight:700, letterSpacing:".05em", color:"#c4a56a", marginBottom:32, textShadow:"0 4px 20px rgba(0,0,0,.5)", whiteSpace:"nowrap"}}>
              HUDA'S Abaya Boutique
            </div>
            <button style={styles.shopBtn} onClick={()=>document.getElementById("shop-grid")?.scrollIntoView({behavior:"smooth"})}>{t.collection}</button>
          </div>
        </div>
        {/* Filter Bar */}
        <div style={styles.filterBar}>
          <input style={styles.searchInput} placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)} />
          {["all","hijabMagnets","printedModal"].map(cat=>(
            <button key={cat} style={{...styles.filterBtn,...(categoryFilter===cat?styles.filterBtnActive:{})}}
              onClick={()=>setCategoryFilter(cat)}>
              {t[cat==="all"?"allCategories":cat]}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div id="shop-grid" style={{...styles.grid, gridTemplateColumns:`repeat(${gridCols},1fr)`}}>
          {visibleProducts.length===0
            ? <div style={{gridColumn:"1/-1",textAlign:"center",padding:60,color:"#999"}}>{t.noResults}</div>
            : visibleProducts.map(p=><ProductCard key={p.id} p={p}/>)}
        </div>
      </>
    );
  }

  const detailImgRef = useRef(null);
  function ProductPage(){
    const p = selectedProduct;
    if(!p) return null;
    const finalPrice = getFinalPrice(p);
    const hasDisc = p.discount>0 || (settings.categoryDiscounts?.[p.category]||0)>0;
    const related = products.filter(x=>x.active&&x.category===p.category&&x.id!==p.id).slice(0,4);
    return (
      <div>
        <button style={{...styles.navBtn, padding:"16px 20px"}} onClick={()=>setPage("shop")}>← {t.back}</button>
        <div style={{...styles.detailWrap, gridTemplateColumns:window.innerWidth<600?"1fr":"1fr 1fr"}}>
          <img ref={detailImgRef} src={p.image} alt={getProdName(p)} style={styles.detailImg} loading="eager" decoding="async" onError={onImgErr} />
          <div>
            <div style={styles.detailName}>{getProdName(p)}</div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              {p.price>0 ? (
                <>
                  <span style={styles.detailPrice}>${finalPrice.toFixed(2)}</span>
                  {hasDisc && <span style={{color:"#999",textDecoration:"line-through"}}>${p.price.toFixed(2)}</span>}
                </>
              ) : <span style={{color:"#999"}}>Price TBD</span>}
            </div>
            <button style={{...styles.detailAddBtn,...(addedMap[p.id]?{background:"#2d7a2d"}:{})}}
              onClick={(e)=>addToCart(p,e,detailImgRef.current)}>
              {addedMap[p.id]?t.addedToCart:t.addToCart}
            </button>
            <button style={{...styles.detailAddBtn,background:"none",color:"#1a1a1a",border:"1px solid #ddd",marginTop:8}}
              onClick={()=>toggleWishlist(p.id)}>
              {wishlist.includes(p.id)?t.removeWishlist:t.addWishlist}
            </button>
          </div>
        </div>
        {related.length>0 && (
          <div style={{padding:"20px 20px 40px"}}>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",marginBottom:16}}>{t.youMayLike}</h3>
            <div style={styles.grid}>{related.map(p=><ProductCard key={p.id} p={p}/>)}</div>
          </div>
        )}
      </div>
    );
  }

  function CartPage(){
    return (
      <div style={styles.cartWrap}>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",marginBottom:20}}>{t.shoppingBag}</h2>
        {cart.length===0
          ? <div style={{textAlign:"center",padding:60,color:"#999"}}>
              <div style={{fontSize:"2rem",marginBottom:12}}>🛍️</div>
              <div>{t.emptyBag}</div>
              <button style={{...styles.shopBtn,marginTop:20}} onClick={()=>setPage("shop")}>{t.continueShopping}</button>
            </div>
          : <>
            {cart.map(item=>{
              const p=products.find(x=>x.id===item.id); if(!p) return null;
              const fp=getFinalPrice(p,item.qty);
              return (
                <div key={item.id} style={styles.cartItem}>
                  <img src={p.image} alt={getProdName(p)} style={styles.cartImg} loading="lazy" decoding="async" onError={onImgErr} />
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,marginBottom:4}}>{getProdName(p)}</div>
                    <div style={{color:"#c4a56a",fontWeight:700}}>{p.price>0?`$${fp.toFixed(2)}`:"Price TBD"}</div>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
                      <button style={styles.qtyBtn} onClick={()=>updateQty(item.id,item.qty-1)}>−</button>
                      <span style={{minWidth:20,textAlign:"center"}}>{item.qty}</span>
                      <button style={styles.qtyBtn} onClick={()=>updateQty(item.id,item.qty+1)}>+</button>
                    </div>
                  </div>
                  <button style={{background:"none",border:"none",color:"#999",cursor:"pointer",fontSize:"1.2rem"}} onClick={()=>removeFromCart(item.id)}>✕</button>
                </div>
              );
            })}
            {/* Coupon - always available */}
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <input style={{...styles.input,marginBottom:0}} placeholder={t.couponCode} value={couponInput} onChange={e=>setCouponInput(e.target.value)} />
            </div>
            {/* Summary */}
            <div style={{background:"#fff",borderRadius:12,padding:16,boxShadow:"0 1px 8px rgba(0,0,0,.06)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span>{t.subtotal}</span><span>${cartTotal.toFixed(2)}</span></div>
              {tax>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span>Tax</span><span>${tax.toFixed(2)}</span></div>}
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span>{t.shipping}</span><span>{shippingCost===0?t.freeShip:`$${shippingCost.toFixed(2)}`}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:"1.1rem",borderTop:"1px solid #eee",paddingTop:8}}>
                <span>{t.total}</span><span>${orderTotal.toFixed(2)}</span>
              </div>
              <button style={{...styles.checkoutBtn,marginTop:16}} onClick={()=>setPage("checkout")}>{t.checkout}</button>
            </div>
          </>
        }
      </div>
    );
  }

  function CheckoutPage(){
    const sf = shippingForm;
    const setSF = (k,v) => setShippingForm(f=>({...f,[k]:v}));
    function validate(){ return sf.name&&sf.email&&sf.addr1&&sf.city&&sf.zip; }
    return (
      <div style={styles.checkoutWrap}>
        <button style={{...styles.navBtn,padding:"16px 0"}} onClick={()=>setPage("cart")}>← {t.back}</button>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",marginBottom:20}}>{t.shippingInfo}</h2>
        {[["name",t.fullName],["email",t.email],["phone",t.phone],["addr1",t.addr1],["addr2",t.addr2],["city",t.city],["state",t.state],["zip",t.zip]].map(([k,label])=>(
          <input key={k} style={styles.input} placeholder={label} value={sf[k]} onChange={e=>setSF(k,e.target.value)} />
        ))}
        {formError && <div style={{color:"#e53935",marginBottom:10,fontSize:".85rem"}}>{formError}</div>}
        <div style={{background:"#fff",borderRadius:12,padding:16,marginBottom:16,boxShadow:"0 1px 8px rgba(0,0,0,.06)"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontWeight:700}}><span>{t.total}</span><span>${orderTotal.toFixed(2)}</span></div>
        </div>
        {settings.paypalClientId ? (
          <div>
            <div style={{textAlign:"center",color:"#666",fontSize:".85rem",marginBottom:12}}>{t.secPay}</div>
            <div id="paypal-btn-container"></div>
          </div>
        ) : (
          <div>
            <div style={{background:"#fff3cd",border:"1px solid #ffc107",borderRadius:8,padding:12,marginBottom:12,fontSize:".85rem"}}>
              <strong>{t.ppNotConf}</strong> {t.ppHint}
            </div>
            <button style={styles.checkoutBtn} onClick={()=>{ if(!validate()){setFormError(t.fillFields);return;} setFormError(""); placeOrder(); }}>
              {t.checkout}
            </button>
          </div>
        )}
      </div>
    );
  }

  function ConfirmPage(){
    const o = confirmOrder;
    return (
      <div style={{maxWidth:500,margin:"60px auto",padding:20,textAlign:"center"}}>
        <div style={{fontSize:"3rem",marginBottom:16}}>✅</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",color:"#2d7a2d"}}>{t.thankYou}</h2>
        <p style={{color:"#666"}}>{t.orderConf}</p>
        {o && <p style={{color:"#999",fontSize:".85rem"}}>Order ID: {o.id}</p>}
        <button style={{...styles.shopBtn,marginTop:24}} onClick={()=>setPage("shop")}>{t.continueShopping}</button>
      </div>
    );
  }

  function Toggle({on,onToggle}){
    return (
      <div style={{...styles.toggle,...(on?styles.toggleOn:{})}} onClick={onToggle}>
        <div style={{...styles.toggleThumb,...(on?styles.toggleThumbOn:{})}}/>
      </div>
    );
  }

  function AdminPage(){
    if(!adminLoggedIn){
      return (
        <div style={{maxWidth:360,margin:"80px auto",padding:24,background:"#fff",borderRadius:12,boxShadow:"0 2px 16px rgba(0,0,0,.08)"}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",marginBottom:20,textAlign:"center"}}>{t.adminPanel}</h2>
          <AdminPasswordInput
            styles={styles}
            placeholder={t.passwordLabel}
            onSubmit={(val,isBlur)=>{
              setAdminPass(val);
              if(isBlur) return;
              if(val===settings.adminPassword){setAdminLoggedIn(true);setAdminPassErr(false);}else setAdminPassErr(true);
            }}
          />
          {adminPassErr && <div style={{color:"#e53935",fontSize:".85rem",marginBottom:8}}>{t.wrongPass}</div>}
          <button style={styles.checkoutBtn} onClick={()=>{ if(adminPass===settings.adminPassword){setAdminLoggedIn(true);setAdminPassErr(false);}else setAdminPassErr(true); }}>{t.login}</button>
        </div>
      );
    }
    return (
      <div style={styles.adminWrap}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem"}}>{t.adminPanel}</h2>
          <button style={{...styles.navBtn,color:"#e53935"}} onClick={()=>setAdminLoggedIn(false)}>{t.logout}</button>
        </div>
        <div style={styles.adminTabs}>
          {["products","pricing","orders","settings"].map(tab=>(
            <button key={tab} style={{...styles.adminTab,...(adminTab===tab?styles.adminTabActive:{})}} onClick={()=>setAdminTab(tab)}>
              {t[tab]}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {adminTab==="products" && (
          <div style={{overflowX:"auto"}}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Image</th>
                  <th style={styles.th}>{t.productName}</th>
                  <th style={styles.th}>{t.price} ($)</th>
                  <th style={styles.th}>{t.discount} (%)</th>
                  <th style={styles.th}>New Arrival</th>
                  <th style={styles.th}>{t.active}</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p=>(
                  <tr key={p.id}>
                    <td style={styles.td}><img src={p.image} style={{width:50,height:65,objectFit:"cover",borderRadius:6}} alt="" loading="lazy" decoding="async" onError={onImgErr} /></td>
                    <td style={styles.td}>
                      <input style={{...styles.adminInput,width:160}} value={p.name} onChange={e=>updateProduct(p.id,"name",e.target.value)} />
                    </td>
                    <td style={styles.td}>
                      <input type="number" style={styles.adminInput} value={p.price} min={0} step={0.01}
                        onChange={e=>updateProduct(p.id,"price",parseFloat(e.target.value)||0)} />
                    </td>
                    <td style={styles.td}>
                      <input type="number" style={styles.adminInput} value={p.discount} min={0} max={100}
                        onChange={e=>updateProduct(p.id,"discount",parseFloat(e.target.value)||0)} />
                    </td>
                    <td style={styles.td}><Toggle on={p.newArrival} onToggle={()=>updateProduct(p.id,"newArrival",!p.newArrival)}/></td>
                    <td style={styles.td}><Toggle on={p.active} onToggle={()=>updateProduct(p.id,"active",!p.active)}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pricing Tab */}
        {adminTab==="pricing" && (
          <div>
            {/* Category Discounts */}
            <div style={styles.pricingCard}>
              <h3 style={{marginBottom:16,fontSize:"1.1rem"}}>Category Discounts</h3>
              {["hijabMagnets","printedModal"].map(cat=>(
                <div key={cat} style={styles.pricingRow}>
                  <span style={styles.pricingLabel}>{t[cat]}</span>
                  <input type="number" style={styles.adminInput} min={0} max={100}
                    value={settings.categoryDiscounts?.[cat]||0}
                    onChange={e=>updateCatDisc(cat,parseFloat(e.target.value)||0)} />
                  <span style={{fontSize:".85rem",color:"#666"}}>%</span>
                  <button style={styles.saveBtn} onClick={()=>saveAdmin("catDisc"+cat)}>{savedMsg["catDisc"+cat]?t.saved:t.save}</button>
                </div>
              ))}
            </div>

            {/* Coupon Code */}
            <div style={styles.pricingCard}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                <h3 style={{fontSize:"1.1rem"}}>{t.couponCode}</h3>
                <Toggle on={settings.couponActive} onToggle={()=>updateSetting("couponActive",!settings.couponActive)}/>
              </div>
              <div style={styles.pricingRow}>
                <span style={styles.pricingLabel}>{t.couponCode}</span>
                <input style={{...styles.adminInput,width:120}} value={settings.couponCode} onChange={e=>updateSetting("couponCode",e.target.value)} />
              </div>
              <div style={styles.pricingRow}>
                <span style={styles.pricingLabel}>{t.couponDiscount}</span>
                <input type="number" style={styles.adminInput} min={0} max={100} value={settings.couponDiscount}
                  onChange={e=>updateSetting("couponDiscount",parseFloat(e.target.value)||0)} />
                <span style={{fontSize:".85rem",color:"#666"}}>%</span>
                <button style={styles.saveBtn} onClick={()=>saveAdmin("coupon")}>{savedMsg["coupon"]?t.saved:t.save}</button>
              </div>
            </div>

            {/* Buy X Get Discount */}
            <div style={styles.pricingCard}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                <h3 style={{fontSize:"1.1rem"}}>{t.buyX}</h3>
                <Toggle on={settings.buyXActive} onToggle={()=>updateSetting("buyXActive",!settings.buyXActive)}/>
              </div>
              <div style={styles.pricingRow}>
                <span style={styles.pricingLabel}>{t.buyXQty}</span>
                <input type="number" style={styles.adminInput} min={1} value={settings.buyXQty}
                  onChange={e=>updateSetting("buyXQty",parseInt(e.target.value)||2)} />
              </div>
              <div style={styles.pricingRow}>
                <span style={styles.pricingLabel}>{t.buyXDisc}</span>
                <input type="number" style={styles.adminInput} min={0} max={100} value={settings.buyXDisc}
                  onChange={e=>updateSetting("buyXDisc",parseFloat(e.target.value)||0)} />
                <span style={{fontSize:".85rem",color:"#666"}}>%</span>
                <button style={styles.saveBtn} onClick={()=>saveAdmin("buyX")}>{savedMsg["buyX"]?t.saved:t.save}</button>
              </div>
            </div>

            {/* Shipping */}
            <div style={styles.pricingCard}>
              <h3 style={{marginBottom:16,fontSize:"1.1rem"}}>{t.shipping}</h3>
              <div style={styles.pricingRow}>
                <span style={styles.pricingLabel}>{t.shipping_price}</span>
                <input type="number" style={styles.adminInput} min={0} value={settings.shippingPrice}
                  onChange={e=>updateSetting("shippingPrice",parseFloat(e.target.value)||0)} />
              </div>
              <div style={styles.pricingRow}>
                <span style={styles.pricingLabel}>{t.freeShipOver}</span>
                <input type="number" style={styles.adminInput} min={0} value={settings.freeShipOver}
                  onChange={e=>updateSetting("freeShipOver",parseFloat(e.target.value)||0)} />
                <button style={styles.saveBtn} onClick={()=>saveAdmin("ship")}>{savedMsg["ship"]?t.saved:t.save}</button>
              </div>
            </div>

            {/* Tax */}
            <div style={styles.pricingCard}>
              <h3 style={{marginBottom:16,fontSize:"1.1rem"}}>{t.taxRate}</h3>
              <div style={styles.pricingRow}>
                <span style={styles.pricingLabel}>{t.taxRate}</span>
                <input type="number" style={styles.adminInput} min={0} max={30} value={settings.taxRate||0}
                  onChange={e=>updateSetting("taxRate",parseFloat(e.target.value)||0)} />
                <span style={{fontSize:".85rem",color:"#666"}}>%</span>
                <button style={styles.saveBtn} onClick={()=>saveAdmin("tax")}>{savedMsg["tax"]?t.saved:t.save}</button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {adminTab==="orders" && (
          <div>
            {orders.length===0
              ? <div style={{textAlign:"center",padding:60,color:"#999"}}>{t.noOrders}</div>
              : <>
                <button style={{...styles.saveBtn,marginBottom:16}} onClick={exportCSV}>{t.exportCSV}</button>
                <div style={{overflowX:"auto"}}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>{t.orderId}</th>
                        <th style={styles.th}>{t.orderDate}</th>
                        <th style={styles.th}>Customer</th>
                        <th style={styles.th}>{t.orderTotal}</th>
                        <th style={styles.th}>{t.orderStatus}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o=>(
                        <tr key={o.id}>
                          <td style={styles.td}>{o.id}</td>
                          <td style={styles.td}>{o.date}</td>
                          <td style={styles.td}>{o.shipping?.name}</td>
                          <td style={styles.td}>${o.total}</td>
                          <td style={styles.td}>
                            <select value={o.status}
                              onChange={e=>setOrders(os=>os.map(x=>x.id===o.id?{...x,status:e.target.value}:x))}
                              style={{border:"1px solid #ddd",borderRadius:6,padding:"4px 8px",fontSize:".8rem"}}>
                              <option value="pending">{t.pending}</option>
                              <option value="shipped">{t.shipped}</option>
                              <option value="delivered">{t.delivered}</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            }
          </div>
        )}

        {/* Settings Tab */}
        {adminTab==="settings" && (
          <div style={styles.pricingCard}>
            {[["storeName","Store Name"],["storeTagline","Tagline"],["paypalClientId","PayPal Client ID"],["whatsapp","WhatsApp Number"],["instagram","Instagram"],["snapchat","Snapchat"],["tiktok","TikTok"],["adminPassword","Admin Password"]].map(([k,label])=>(
              <div key={k} style={styles.pricingRow}>
                <span style={styles.pricingLabel}>{label}</span>
                <input style={{...styles.adminInput,width:220}} value={settings[k]||""} onChange={e=>updateSetting(k,e.target.value)} />
              </div>
            ))}
            <button style={{...styles.saveBtn,marginTop:8}} onClick={()=>saveAdmin("settings")}>{savedMsg["settings"]?t.saved:t.save}</button>
          </div>
        )}
      </div>
    );
  }

  // ── Page transition ──────────────────────────────────────────────
  useEffect(()=>{
    setTransitioning(true);
    const timer = setTimeout(()=>setTransitioning(false), 30);
    return ()=>clearTimeout(timer);
  },[page, selectedProduct]);

  const pageTransitionStyle = {
    opacity: transitioning?0:1,
    transform: transitioning?"translateY(14px) scale(.99)":"translateY(0) scale(1)",
    filter: transitioning?"blur(4px)":"blur(0px)",
    transition: "opacity .45s cubic-bezier(.22,1,.36,1), transform .45s cubic-bezier(.22,1,.36,1), filter .45s ease",
  };

  // ── Main Render ─────────────────────────────────────────────────
  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <style>{`
          @keyframes huda-marquee{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}
          @keyframes huda-fly{
            0%{ transform:translate(0,0) scale(1); opacity:1; }
            65%{ opacity:1; }
            100%{ transform:translate(var(--tx),var(--ty)) scale(.1); opacity:.3; }
          }
          @keyframes huda-cart-pulse{
            0%{ transform:scale(1); }
            30%{ transform:scale(1.35); }
            55%{ transform:scale(.92); }
            100%{ transform:scale(1); }
          }
          @keyframes huda-shine{
            0%{ background-position:150% 0; }
            55%{ background-position:150% 0; }
            100%{ background-position:-60% 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            *{animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important;}
          }
          html{-webkit-text-size-adjust:100%;}
          img{-webkit-user-drag:none;}
        `}</style>
        <div style={styles.headerTop}>
          <div style={styles.brandRow}>
            <div style={styles.logoCircle}>
              <img src="https://i.ibb.co/0g2zNT6/D8-F67706-FEEF-4-CB8-B919-00-B889-A36214.png" alt={settings.storeName} style={styles.logoCircleImg} />
            </div>
          </div>
          {winWidth>=500 && (
            <div style={{flex:1, overflow:"hidden", margin:"0 14px"}}>
              <div style={{display:"inline-block", whiteSpace:"nowrap", animation:"huda-marquee 18s linear infinite", fontSize:".72rem", fontWeight:700, letterSpacing:".06em", color:"#c4a56a"}}>
                🇺🇸&nbsp; SHIPPING TO ALL 50 US STATES &nbsp;·&nbsp; NEW ARRIVALS EVERY WEEK &nbsp;·&nbsp; SHOP NOW &nbsp;·&nbsp; 🇺🇸&nbsp; SHIPPING TO ALL 50 US STATES &nbsp;·&nbsp; NEW ARRIVALS EVERY WEEK &nbsp;·&nbsp; SHOP NOW &nbsp;·&nbsp;
              </div>
            </div>
          )}
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button style={styles.navBtn} onClick={()=>setLang(l=>l==="en"?"ar":"en")}>{t.langBtn}</button>
            <div style={{position:"relative"}}>
              <button ref={cartBtnRef}
                style={{
                  ...styles.cartBtn,
                  transform:`scale(${(cartPulse?1.12:1) * Math.min(1+cart.reduce((s,i)=>s+i.qty,0)*0.02,1.15)})`,
                  transition: cartPulse ? "transform .18s cubic-bezier(.34,1.56,.64,1)" : "transform .35s cubic-bezier(.34,1.56,.64,1)",
                }}
                onClick={()=>{setPage("cart");window.scrollTo({top:0,behavior:"smooth"});}}>
                🛍️
              </button>
              {cart.reduce((s,i)=>s+i.qty,0)>0 && (
                <div style={{
                  position:"absolute", top:-8, right:isRTL?undefined:-8, left:isRTL?-8:undefined,
                  background:"#fff", color:"#1a1a1a", fontSize:".68rem", fontWeight:800,
                  minWidth:20, height:20, borderRadius:6, padding:"0 5px",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 2px 8px rgba(0,0,0,.3), 0 0 0 2px #c4a56a",
                  transform:cartPulse?"scale(1.3)":"scale(1)",
                  transition: cartPulse ? "transform .18s cubic-bezier(.34,1.56,.64,1)" : "transform .3s cubic-bezier(.34,1.56,.64,1)",
                }}>
                  {cart.reduce((s,i)=>s+i.qty,0)}
                </div>
              )}
            </div>
          </div>
        </div>
        {winWidth<500 && (
          <div style={{overflow:"hidden", padding:"5px 0", borderBottom:"1px solid #333"}}>
            <div style={{display:"inline-block", whiteSpace:"nowrap", animation:"huda-marquee 15s linear infinite", fontSize:".68rem", fontWeight:700, letterSpacing:".05em", color:"#c4a56a"}}>
              🇺🇸&nbsp; SHIPPING TO ALL 50 US STATES &nbsp;·&nbsp; NEW ARRIVALS EVERY WEEK &nbsp;·&nbsp; SHOP NOW &nbsp;·&nbsp; 🇺🇸&nbsp; SHIPPING TO ALL 50 US STATES &nbsp;·&nbsp; NEW ARRIVALS EVERY WEEK &nbsp;·&nbsp; SHOP NOW &nbsp;·&nbsp;
            </div>
          </div>
        )}
        <div style={styles.headerBottom}>
          {[["shop",t.store],["cart",t.shoppingBag],["admin",t.admin]].map(([p2,label])=>(
            <button key={p2} style={{...styles.navBtn,...(page===p2||( p2==="shop"&&["shop","product"].includes(page))?styles.navBtnActive:{})}}
              onClick={()=>setPage(p2)}>{label}</button>
          ))}
          {/* Wishlist */}
          {wishlist.length>0 && (
            <button style={{...styles.navBtn}} onClick={()=>{ setCategoryFilter("all"); setSearch(""); setPage("shop"); }}>
              ♥ {t.wishlist} ({wishlist.length})
            </button>
          )}
          {/* Social */}
          {settings.instagram && (
            <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram"
              style={{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30}}>
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="#ccc" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5.5"/>
                <circle cx="12" cy="12" r="4.2"/>
                <circle cx="17.4" cy="6.6" r="1.1" fill="#ccc" stroke="none"/>
              </svg>
            </a>
          )}
          {settings.snapchat && (
            <a href={`https://snapchat.com/add/${settings.snapchat}`} target="_blank" rel="noreferrer" aria-label="Snapchat"
              style={{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30}}>
              <svg viewBox="0 0 24 24" width="19" height="19" fill="#ccc">
                <path d="M12 2.2c-3 0-5 2.2-5 5.4 0 1 .05 1.9-.1 2.6-.5.15-1.1.2-1.6.05-.5-.15-.95.4-.6.9.5.7 1.4 1.35 2.15 1.7-.05.4-.3.85-.85 1.35-.85.75-2.1 1.1-3 1.3-.5.1-.45.85 0 1 .5.15 1.05.3 1.5.55.1.35.05.75.35 1 .5.4 1.75.15 2.6.45 1 .35 1.9 1.2 3.55 1.2s2.55-.85 3.55-1.2c.85-.3 2.1-.05 2.6-.45.3-.25.25-.65.35-1 .45-.25 1-.4 1.5-.55.45-.15.5-.9 0-1-.9-.2-2.15-.55-3-1.3-.55-.5-.8-.95-.85-1.35.75-.35 1.65-1 2.15-1.7.35-.5-.1-1.05-.6-.9-.5.15-1.1.1-1.6-.05-.15-.7-.1-1.6-.1-2.6 0-3.2-2-5.4-5-5.4z"/>
              </svg>
            </a>
          )}
          {settings.tiktok && (
            <a href={`https://tiktok.com/@${settings.tiktok}`} target="_blank" rel="noreferrer" aria-label="TikTok"
              style={{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30}}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#ccc">
                <path d="M16.6 2h-3.2v13.4c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .55.03.8.1V9.6c-.25-.03-.5-.05-.8-.05-3.2 0-5.8 2.6-5.8 5.8S8.5 21.1 11.7 21.1s5.8-2.6 5.8-5.8V8.4c1.2.9 2.65 1.4 4.2 1.4V6.6c-2.6 0-4.8-2-5.1-4.6z"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Pages */}
      <div style={pageTransitionStyle}>
        {page==="shop" && <ShopPage/>}
        {page==="product" && <ProductPage/>}
        {page==="cart" && <CartPage/>}
        {page==="checkout" && <CheckoutPage/>}
        {page==="confirm" && <ConfirmPage/>}
        {page==="admin" && <AdminPage/>}
      </div>
      {/* Fly-to-cart animation */}
      {flyItem && (
        <img src={flyItem.img} alt=""
          style={{
            position:"fixed", left:flyItem.x, top:flyItem.y, width:52, height:52, objectFit:"cover",
            borderRadius:"50%", zIndex:300, pointerEvents:"none", border:"2px solid #c4a56a", boxShadow:"0 6px 20px rgba(0,0,0,.35)",
            "--tx":flyItem.tx+"px", "--ty":flyItem.ty+"px",
            animation:"huda-fly .62s cubic-bezier(.3,0,.6,1) forwards",
          }}
        />
      )}
      {/* Cross-sell modal */}
      {crossSell && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:20}}
          onClick={()=>setCrossSell(null)}>
          <div style={{background:"#fff",borderRadius:16,padding:24,maxWidth:340,width:"100%",textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}
            onClick={e=>e.stopPropagation()}>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",marginBottom:4}}>{t.completeLook}</h3>
            <p style={{color:"#777",fontSize:".85rem",marginBottom:18}}>{t.completeLookSub}</p>
            <div style={{width:140,height:140,margin:"0 auto 18px",borderRadius:"50%",position:"relative",padding:4,
              background:"#c4a56a", boxShadow:"0 0 16px rgba(196,165,106,.6)"}}>
              <div style={{width:"100%",height:"100%",borderRadius:"50%",overflow:"hidden",background:"#fff",padding:3,position:"relative"}}>
                <img src={crossSell.image} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}} onError={onImgErr} />
                <div style={{
                  position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden", pointerEvents:"none",
                  background:"linear-gradient(115deg, transparent 30%, rgba(255,255,255,.75) 48%, transparent 66%)",
                  backgroundSize:"260% 100%", backgroundPosition:"150% 0",
                  animation:"huda-shine 2.6s ease-in-out infinite",
                }}/>
              </div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button style={{...styles.detailAddBtn,marginTop:0,flex:1}} onClick={()=>{ addToCart(crossSell); setCrossSell(null); }}>{t.yesAdd}</button>
              <button style={{...styles.detailAddBtn,marginTop:0,flex:1,background:"none",color:"#1a1a1a",border:"1px solid #ddd"}} onClick={()=>setCrossSell(null)}>{t.noThanks}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
