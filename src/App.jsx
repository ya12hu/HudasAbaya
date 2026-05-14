import React, { useState, useEffect, useRef } from "react";

/* ─── TRANSLATIONS ─────────────────────────────────────────────── */
const T = {
  en: {
    store:"Store", admin:"Admin",
    sort:"Sort", searchPh:"Search...",
    browseBy:"Browse by Category", ourCollections:"Our Collections",
    newArrivals:"New Arrivals", moreLove:"More to love",
    mainImg:"MAIN", changeImg:"Change", orPasteUrl:"Or paste image URL:",
    pressEnter:"Press Enter to add · Max 5 images",
    maxImages:"Max 5 images", inStockSub:"Shipping to the US only",
    backAdmin:"Back", wishlistNav:"Wishlist", trackNav:"Track Order",
    heroBtn:"Shop Now", heroSub:"New Collection Available",
    allCats:"All", outOfStock:"Out of Stock", addToCart:"Add to Bag",
    soldOut:"Sold Out", addedToCart:"Added ✓", quickView:"Quick View",
    wishAdd:"Saved ✓", wishRemove:"Removed",
    back:"← Back", size:"Size", color:"Color", gallery:"Gallery",
    shareWA:"Share on WhatsApp", similarTitle:"You May Also Like",
    rateTitle:"Rate this product", rated:"Thanks for rating!",
    bag:"Bag", emptyBag:"Your bag is empty", continueShopping:"Continue Shopping",
    subtotal:"Subtotal", shipping:"Shipping", freeShip:"US Only",
    total:"Total", checkout:"Checkout →",
    shippingInfo:"Shipping Info", payment:"Payment",
    fullName:"Full Name", email:"Email", phone:"Phone (optional)",
    addr1:"Address", addr2:"Apt/Suite (optional)", city:"City", state:"State", zip:"ZIP",
    contPayment:"Continue to Payment →",
    secPay:"🔒 Secure payment via PayPal",
    ppNotConf:"PayPal Not Configured",
    ppHint:"Go to Admin → Settings and enter your PayPal Client ID.",
    thankYou:"Thank You!", orderConf:"Your order is confirmed.",
    orderNum:"Order #", shipTo:"Shipping to",
    trackTitle:"Track Your Order", trackPh:"Enter Order #", trackBtn:"Track",
    trackFound:"Order Found", trackNotFound:"Order not found",
    fillFields:"Please fill all required fields.",
    adminPanel:"Admin Panel", logout:"Logout",
    dashTab:"📊 Inventory", prodsTab:"📦 Products",
    ordersTab:"🛍️ Orders", setTab:"⚙️ Settings",
    sProd:"Products", sStock:"Stock", sOrders:"Orders", sRev:"Revenue",
    newProd:"+ New Product", editProd:"✏️ Edit", cancelEdit:"✕ Cancel",
    catLabel:"Category", subcatLabel:"Sub-category", typeLabel:"Type",
    nameLabel:"Name (EN)", priceLabel:"Price ($)", origPrice:"Original $ (optional)",
    saleDateLabel:"Sale ends (optional)", imgLabel:"Product Images",
    uploadBtn:"Upload Photo", urlPh:"Or paste URL...", removeImg:"Remove",
    descLabel:"Description", saveBtn:"💾 Save", addBtn:"✓ Add Product",
    vmTitle:"📐 Sizes · Colors · Stock",
    szLabel:"Size", clrLabel:"Color", stkLabel:"Qty",
    selSz:"-- Select --", addVar:"+ Add",
    vmTotal:"Total", vmPcs:"pcs",
    editBtn:"Edit", delBtn:"Delete", delConfirm:"Delete this product?",
    deleted:"🗑️ Deleted", varsLabel:"variants", pcsLabel:"pcs",
    noOrders:"No orders yet",
    exportOrders:"📥 Export CSV",
    storeSettings:"Store Settings", storeNameL:"Store Name", taglineL:"Tagline",
    heroTitleL:"Hero Title", heroSubL:"Hero Subtitle",
    ppClientId:"PayPal Client ID", waNumber:"WhatsApp Number (for notifications)",
    waNumberPh:"+1234567890", adminPwL:"Admin Password",
    saveSet:"💾 Save", setOk:"✓ Saved",
    waNotify:"📲 New Order — Notify via WhatsApp",
    colProd:"Product", colType:"Type", colColors:"Colors", colSizes:"Sizes",
    colTotal:"Total", colDetail:"Variants",
    saleEnds:"Sale ends in", days:"d", hours:"h", mins:"m", secs:"s",
    onlyLeft: n => `Only ${n} left`,
    inStock: (n,s) => `${n} in stock · ${s}`,
    items: n => `(${n} items)`,
    prodCount: n => `${n} products`,
  },
  ar: {
    store:"المتجر", admin:"الإدارة",
    sort:"ترتيب", searchPh:"بحث...",
    browseBy:"تصفح حسب الفئة", ourCollections:"تشكيلاتنا",
    newArrivals:"وصل حديثاً", moreLove:"قد يعجبك أيضاً",
    mainImg:"رئيسية", changeImg:"تغيير", orPasteUrl:"أو حط رابط URL:",
    pressEnter:"اضغط Enter لإضافة · أقصى 5 صور",
    maxImages:"أقصى 5 صور", inStockSub:"شحن داخل أمريكا فقط",
    backAdmin:"رجوع", wishlistNav:"المفضلة", trackNav:"تتبع الطلب",
    heroBtn:"تسوقي الآن", heroSub:"تشكيلة جديدة متاحة",
    allCats:"الكل", outOfStock:"نفذ المخزون", addToCart:"أضف للسلة",
    soldOut:"نفذ", addedToCart:"✓ تمت الإضافة", quickView:"عرض سريع",
    wishAdd:"✓ أُضيف للمفضلة", wishRemove:"حُذف من المفضلة",
    back:"رجوع →", size:"المقاس", color:"اللون", gallery:"الصور",
    shareWA:"شارك على واتساب", similarTitle:"قد يعجبك أيضاً",
    rateTitle:"قيّم هذا المنتج", rated:"شكراً على تقييمك!",
    bag:"السلة", emptyBag:"السلة فارغة", continueShopping:"تسوقي الآن",
    subtotal:"المجموع", shipping:"الشحن", freeShip:"داخل أمريكا فقط",
    total:"الإجمالي", checkout:"إتمام الشراء ←",
    shippingInfo:"عنوان الشحن", payment:"الدفع",
    fullName:"الاسم الكامل", email:"البريد الإلكتروني", phone:"الهاتف (اختياري)",
    addr1:"العنوان", addr2:"شقة/جناح (اختياري)", city:"المدينة", state:"الولاية", zip:"الرمز البريدي",
    contPayment:"المتابعة للدفع ←",
    secPay:"🔒 دفع آمن عبر PayPal",
    ppNotConf:"PayPal غير مفعّل",
    ppHint:"اروح الإدارة ← الإعدادات وأضف PayPal Client ID.",
    thankYou:"شكراً لك!", orderConf:"تم تأكيد طلبك.",
    orderNum:"طلب رقم ", shipTo:"سيُشحن إلى",
    trackTitle:"تتبع طلبك", trackPh:"أدخل رقم الطلب", trackBtn:"بحث",
    trackFound:"تم إيجاد الطلب", trackNotFound:"رقم الطلب غير موجود",
    fillFields:"أكمل جميع الحقول المطلوبة.",
    adminPanel:"لوحة الإدارة", logout:"تسجيل خروج",
    dashTab:"📊 المخزون", prodsTab:"📦 المنتجات",
    ordersTab:"🛍️ الطلبات", setTab:"⚙️ الإعدادات",
    sProd:"المنتجات", sStock:"المخزون", sOrders:"الطلبات", sRev:"الأرباح",
    newProd:"+ منتج جديد", editProd:"✏️ تعديل", cancelEdit:"✕ إلغاء",
    catLabel:"الفئة", subcatLabel:"الفئة الفرعية", typeLabel:"النوع",
    nameLabel:"اسم المنتج (إنكليزي)", priceLabel:"السعر ($)", origPrice:"قبل الخصم (اختياري)",
    saleDateLabel:"انتهاء العرض (اختياري)", imgLabel:"صور المنتج",
    uploadBtn:"رفع صورة", urlPh:"أو حط رابط URL...", removeImg:"حذف",
    descLabel:"الوصف", saveBtn:"💾 حفظ التعديلات", addBtn:"✓ إضافة المنتج",
    vmTitle:"📐 إدارة الأحجام والألوان والمخزون",
    szLabel:"الحجم", clrLabel:"اللون", stkLabel:"الكمية",
    selSz:"-- اختر --", addVar:"+ أضف",
    vmTotal:"المجموع", vmPcs:"قطعة",
    editBtn:"تعديل", delBtn:"حذف", delConfirm:"تحذف هذا المنتج؟",
    deleted:"🗑️ حُذف", varsLabel:"variant", pcsLabel:"قطعة",
    noOrders:"لا يوجد طلبات بعد",
    exportOrders:"📥 تصدير CSV",
    storeSettings:"إعدادات المتجر", storeNameL:"اسم المتجر", taglineL:"وصف قصير",
    heroTitleL:"عنوان الصفحة الرئيسية", heroSubL:"النص التحتي",
    ppClientId:"PayPal Client ID", waNumber:"رقم واتساب (للإشعارات)",
    waNumberPh:"+9647XXXXXXXXX", adminPwL:"كلمة سر الإدارة",
    saveSet:"💾 حفظ", setOk:"✓ تم الحفظ",
    waNotify:"📲 طلب جديد — إشعار واتساب",
    colProd:"المنتج", colType:"النوع", colColors:"الألوان", colSizes:"الأحجام",
    colTotal:"المجموع", colDetail:"التفاصيل",
    saleEnds:"العرض ينتهي خلال", days:"ي", hours:"س", mins:"د", secs:"ث",
    onlyLeft: n => `آخر ${n} قطع`,
    inStock: (n,s) => `${n} قطعة · ${s}`,
    items: n => `(${n} قطعة)`,
    prodCount: n => `${n} منتج`,
  }
};

/* ─── CONSTANTS ─────────────────────────────────────────────────── */
const CATEGORY_TREE = {
  "Abayas":{ subcats:["Women's Abayas","Girls' Abayas"], types:{"Women's Abayas":["Classic","Butterfly","Open Front","Prayer","Set","Embroidered","Other"],"Girls' Abayas":["Classic","Open Front","Prayer","Set","Other"]}, sizes:{"Women's Abayas":["Free Size",'50"','52"','54"','56"','58"','60"',"S","M","L","XL","One Size"],"Girls' Abayas":["4-5Y","6-7Y","8-9Y","10-11Y","12-13Y"]} },
  "Hijabs":{ subcats:["Women's Hijabs","Girls' Hijabs"], types:{"Women's Hijabs":["Modal","Chiffon","Jersey","Cotton","Satin","Printed","Set","Khimar","Other"],"Girls' Hijabs":["Modal","Chiffon","Jersey","Cotton","Printed","Other"]}, sizes:{"Women's Hijabs":["One Size","S","M","L"],"Girls' Hijabs":["One Size","S","M"]} },
  "Cosmetics":{ subcats:["Makeup","Skincare"], types:{"Makeup":["Lipstick","Foundation","Mascara","Eyeshadow","Blush","Set","Other"],"Skincare":["Moisturizer","Serum","Cleanser","Toner","Mask","SPF","Other"]}, sizes:{"Makeup":["One Size"],"Skincare":["One Size"]} }
};
const ALL_SUBCATS = ["All","Women's Abayas","Girls' Abayas","Women's Hijabs","Girls' Hijabs","Makeup","Skincare"];
const USD = p => "$"+Number(p).toFixed(2);
const ICON = {"Women's Abayas":"👘","Girls' Abayas":"👗","Women's Hijabs":"🧕","Girls' Hijabs":"🌸","Makeup":"💄","Skincare":"🧴"};
const DEFAULT_SETTINGS = { paypalClientId:"", storeName:"HUDA'S", storeTagline:"Abaya Boutique · Modest Fashion · Shipping to the US only", heroTitle:"Elegance", heroSub:"New Collection — Shipping to the US only", whatsappNumber:"", adminPassword:"huda2024" };

const SAMPLE_PRODUCTS = [];

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
function getLogo(){ return "data:image/png;base64,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"; }
const LOGO = getLogo();

const totalStock = p => (p.variants||[]).reduce((s,v)=>s+Number(v.stock||0),0);
const getVariant = (p,sz,cl) => (p.variants||[]).find(v=>v.size===sz&&v.color===cl);
const firstImg = p => (p.imageUrls||[])[0]||"";

/* ─── COUNTDOWN HOOK ─────────────────────────────────────────────── */
function useCountdown(dateStr) {
  const [time, setTime] = useState(null);
  useEffect(()=>{
    if(!dateStr) return;
    const tick = () => {
      const diff = new Date(dateStr) - new Date();
      if(diff<=0){ setTime(null); return; }
      setTime({ d:Math.floor(diff/86400000), h:Math.floor((diff%86400000)/3600000), m:Math.floor((diff%3600000)/60000), s:Math.floor((diff%60000)/1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return ()=>clearInterval(id);
  },[dateStr]);
  return time;
}

/* ─── STAR RATING ────────────────────────────────────────────────── */
function Stars({rating, onRate, size=16}) {
  const [hover,setHover]=useState(0);
  return (
    <div style={{display:"flex",gap:2}}>
      {[1,2,3,4,5].map(i=>(
        <span key={i} onClick={()=>onRate&&onRate(i)} onMouseEnter={()=>onRate&&setHover(i)} onMouseLeave={()=>setHover(0)}
          style={{fontSize:size,cursor:onRate?"pointer":"default",color:(hover||rating)>=i?"#f4c43d":"#e0d0c0",transition:"color .15s"}}>★</span>
      ))}
    </div>
  );
}

/* ─── APP ─────────────────────────────────────────────────────────── */
export default function App() {
  const [lang,setLang]=useState("en");
  const t=T[lang], isAr=lang==="ar", F=isAr?"'Tajawal',sans-serif":"'DM Sans',sans-serif";

  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState([]);
  const [orders,setOrders]=useState([]);
  const [settings,setSettings]=useState(DEFAULT_SETTINGS);
  const [wishlist,setWishlist]=useState([]);
  const [ratings,setRatings]=useState({});
  const [view,setView]=useState("home");
  const [selProd,setSelProd]=useState(null);
  const [filterCat,setFilterCat]=useState("All");
  const [search,setSearch]=useState("");
  const [sortBy,setSortBy]=useState("default");
  const [adminUnlocked,setAdminUnlocked]=useState(false);
  const [adminPwInput,setAdminPwInput]=useState("");
  const [adminTab,setAdminTab]=useState("dashboard");
  const [editProd,setEditProd]=useState(null);
  const [loading,setLoading]=useState(true);
  const [notif,setNotif]=useState(null);
  const [trackId,setTrackId]=useState("");
  const [trackedOrder,setTrackedOrder]=useState(null);
  const [trackSearched,setTrackSearched]=useState(false);

  const emptyForm = {name:"",category:"Abayas",subcategory:"Women's Abayas",type:"Classic",price:"",originalPrice:"",saleEndDate:"",imageUrls:[],description:"",variants:[]};
  const [form,setForm]=useState(emptyForm);
  const [vForm,setVForm]=useState({size:"",color:"",stock:""});

  const toast=(msg,err=false)=>{setNotif({msg,err});setTimeout(()=>setNotif(null),2800);};

  useEffect(()=>{
    try{
      const p=localStorage.getItem("b_prods");
      if(p) setProducts(JSON.parse(p));
      else { setProducts(SAMPLE_PRODUCTS); localStorage.setItem("b_prods",JSON.stringify(SAMPLE_PRODUCTS)); }
      const c=localStorage.getItem("b_cart"); if(c) setCart(JSON.parse(c));
      const o=localStorage.getItem("b_orders"); if(o) setOrders(JSON.parse(o));
      const s=localStorage.getItem("b_settings"); if(s) setSettings({...DEFAULT_SETTINGS,...JSON.parse(s)});
      const w=localStorage.getItem("b_wishlist"); if(w) setWishlist(JSON.parse(w));
      const r=localStorage.getItem("b_ratings"); if(r) setRatings(JSON.parse(r));
    }catch{}
    setLoading(false);
  },[]);

  const saveP=p=>{setProducts(p);try{localStorage.setItem("b_prods",JSON.stringify(p));}catch{}};
  const saveC=c=>{setCart(c);try{localStorage.setItem("b_cart",JSON.stringify(c));}catch{}};
  const saveO=o=>{setOrders(o);try{localStorage.setItem("b_orders",JSON.stringify(o));}catch{}};
  const saveS=s=>{setSettings(s);try{localStorage.setItem("b_settings",JSON.stringify(s));}catch{}};
  const saveW=w=>{setWishlist(w);try{localStorage.setItem("b_wishlist",JSON.stringify(w));}catch{}};
  const saveR=r=>{setRatings(r);try{localStorage.setItem("b_ratings",JSON.stringify(r));}catch{}};

  const toggleWish=id=>{const nw=wishlist.includes(id)?wishlist.filter(x=>x!==id):[...wishlist,id];saveW(nw);toast(wishlist.includes(id)?t.wishRemove:t.wishAdd);};
  const rateProduct=(id,stars)=>{const nr={...ratings,[id]:{stars,rated:true}};saveR(nr);toast(t.rated);};

  const addToCart=(product,variant)=>{
    const key=`${product.id}-${variant.size}-${variant.color}`;
    const ex=cart.find(i=>i.key===key);
    if(ex&&ex.qty>=Number(variant.stock))return toast(isAr?"لا يوجد مخزون كافٍ":"Out of stock",true);
    const nc=ex?cart.map(i=>i.key===key?{...i,qty:i.qty+1}:i):[...cart,{...product,key,variantSize:variant.size,variantColor:variant.color,qty:1}];
    saveC(nc);toast(t.addedToCart);
  };
  const removeFromCart=key=>saveC(cart.filter(i=>i.key!==key));
  const updateQty=(key,qty)=>{if(qty<1)return removeFromCart(key);saveC(cart.map(i=>i.key===key?{...i,qty}:i));};
  const cartTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const cartCount=cart.reduce((s,i)=>s+i.qty,0);

  const placeOrder=info=>{
    // Reduce stock
    const updatedProds=products.map(p=>{
      const newVars=p.variants.map(v=>{
        const cartItem=cart.find(i=>i.id===p.id&&i.variantSize===v.size&&i.variantColor===v.color);
        if(cartItem) return {...v,stock:Math.max(0,Number(v.stock)-cartItem.qty)};
        return v;
      });
      return {...p,variants:newVars};
    });
    saveP(updatedProds);
    const orderId=Date.now().toString().slice(-8);
    const newOrders=[{...info,id:orderId,date:new Date().toLocaleDateString("en-US"),items:[...cart],total:cartTotal},...orders];
    saveO(newOrders);saveC([]);
    // WhatsApp notify
    if(settings.whatsappNumber){
      const msg=encodeURIComponent(`🛍️ New Order #${orderId}\n👤 ${info.name}\n📍 ${info.city}, ${info.state}\n💰 ${USD(cartTotal)}\n📦 ${cart.map(i=>`${i.name} (${i.variantSize}/${i.variantColor}) x${i.qty}`).join(", ")}`);
      window.open(`https://wa.me/${settings.whatsappNumber.replace(/\D/g,"")}?text=${msg}`,"_blank");
    }
    return orderId;
  };

  const filtered=products
    .filter(p=>filterCat==="All"||p.subcategory===filterCat)
    .filter(p=>!search||p.name.toLowerCase().includes(search.toLowerCase())||p.type?.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>sortBy==="price_asc"?a.price-b.price:sortBy==="price_desc"?b.price-a.price:0);

  const handleSave=()=>{
    if(!form.name||!form.price)return toast(isAr?"أكمل الاسم والسعر":"Fill name and price",true);
    if(!form.variants?.length)return toast(isAr?"أضف variant":"Add at least one variant",true);
    const prod={...form,id:editProd?editProd.id:Date.now(),price:Number(form.price),originalPrice:form.originalPrice?Number(form.originalPrice):null};
    const np=editProd?products.map(p=>p.id===editProd.id?prod:p):[...products,prod];
    saveP(np);toast(editProd?(isAr?"✓ تم التحديث":"✓ Updated"):(isAr?"✓ تم الإضافة":"✓ Added"));
    setForm(emptyForm);setEditProd(null);
  };
  const startEdit=p=>{setEditProd(p);setForm({...p,price:String(p.price),originalPrice:p.originalPrice||"",saleEndDate:p.saleEndDate||"",variants:[...p.variants],imageUrls:[...(p.imageUrls||[])]});};
  const handleDelete=id=>{if(confirm(isAr?"تحذف هذا المنتج؟":"Delete this product?")){saveP(products.filter(p=>p.id!==id));toast(t.deleted);}};
  const addVariant=()=>{
    if(!vForm.size||!vForm.color||!vForm.stock)return toast(isAr?"أكمل الحجم واللون والكمية":"Fill size, color & qty",true);
    if(form.variants.find(v=>v.size===vForm.size&&v.color===vForm.color))return toast(isAr?"هذا الـ variant موجود":"Variant exists",true);
    setForm(f=>({...f,variants:[...f.variants,{...vForm,id:Date.now(),stock:Number(vForm.stock)}]}));
    setVForm({size:"",color:"",stock:""});
  };
  const removeVariant=vid=>setForm(f=>({...f,variants:f.variants.filter(v=>v.id!==vid)}));
  const updateVarStock=(vid,stock)=>setForm(f=>({...f,variants:f.variants.map(v=>v.id===vid?{...v,stock:Number(stock)}:v)}));

  const addImage=src=>{if((form.imageUrls||[]).length>=5)return toast(isAr?"أقصى 5 صور":t.maxImages,true);setForm(f=>({...f,imageUrls:[...(f.imageUrls||[]),src]}));};
  const removeImage=idx=>setForm(f=>({...f,imageUrls:(f.imageUrls||[]).filter((_,i)=>i!==idx)}));

  const exportOrders=()=>{
    const headers=["ID","Name","Email","Phone","Address","City","State","ZIP","Date","Total","Items"];
    const rows=orders.map(o=>[o.id,o.name,o.email,o.phone||"",`${o.address1} ${o.address2||""}`.trim(),o.city,o.state,o.zip,o.date,USD(o.total),(o.items||[]).map(i=>`${i.name}(${i.variantSize}/${i.variantColor})x${i.qty}`).join("; ")]);
    const csv=[headers,...rows].map(r=>r.map(v=>(`"${String(v).replace(/"/g,"\"\"")}`)).join(",")).join("\n");
    const a=document.createElement("a");a.href="data:text/csv;charset=utf-8,\uFEFF"+encodeURIComponent(csv);a.download="HUDAS_Orders.csv";a.click();
  };

  const sizePresets=CATEGORY_TREE[form.category]?.sizes[form.subcategory]||[];

  if(loading) return (<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#faf7f2",color:"#8B6914",fontFamily:"serif",fontSize:"1.3rem"}}>Loading...</div>);

  return (
    <div dir={isAr?"rtl":"ltr"} style={{minHeight:"100vh",background:"#faf7f2",color:"#1a1208",fontFamily:"Georgia,serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Tajawal:wght@300;400;500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#c4a56a;border-radius:4px}
        @keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes toast{from{opacity:0;transform:translate(-50%,-14px)}to{opacity:1;transform:translate(-50%,0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .card{transition:transform .3s cubic-bezier(.25,.8,.25,1),box-shadow .3s}
        .card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(58,32,6,.13)!important}
        .btn{transition:all .2s}.btn:hover{filter:brightness(.92);transform:translateY(-1px)}
        .nav-link{transition:all .2s;background:none;border:none;cursor:pointer;font-weight:600;letter-spacing:.08em}
        .heart{transition:all .2s}.heart:hover{transform:scale(1.2)}
        input:focus,select:focus,textarea:focus{outline:none;border-color:#c4a56a!important;box-shadow:0 0 0 3px rgba(196,165,106,.12)!important}
        input,select,textarea{outline:none}
        .tag{display:inline-block;background:#f0e4cc;color:#7a5012;padding:2px 10px;border-radius:30px;font-size:.7rem;font-weight:600;letter-spacing:.04em}
        .slide-in{animation:up .4s cubic-bezier(.25,.8,.25,1) both}
      `}</style>

      {notif&&<div style={{position:"fixed",top:20,left:"50%",zIndex:9999,background:notif.err?"#7f1d1d":"#1a3a1f",color:"#fff",padding:"11px 28px",borderRadius:40,fontSize:".85rem",fontFamily:F,boxShadow:"0 8px 30px rgba(0,0,0,.2)",animation:"toast .3s ease",whiteSpace:"nowrap",transform:"translate(-50%,0)"}}>{notif.msg}</div>}

      {/* ── HEADER ── */}
      <header style={{background:"rgba(255,252,248,.96)",backdropFilter:"blur(12px)",borderBottom:"1px solid #ede5d8",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 20px rgba(0,0,0,.04)"}}>
        <div style={{maxWidth:1300,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:66}}>
          <div style={{display:"flex",gap:2,alignItems:"center"}}>
            <button className="nav-link" onClick={()=>setView("home")} style={{fontFamily:F,fontSize:isAr?".88rem":".75rem",color:view==="home"?"#8B6914":"#aaa",borderBottom:view==="home"?"2px solid #8B6914":"2px solid transparent",padding:"8px 12px"}}>{t.store}</button>
            <button className="nav-link" onClick={()=>{setView("wishlist");}} style={{fontFamily:F,fontSize:isAr?".88rem":".75rem",color:view==="wishlist"?"#8B6914":"#aaa",borderBottom:view==="wishlist"?"2px solid #8B6914":"2px solid transparent",padding:"8px 12px"}}>
              {t.wishlistNav}{wishlist.length>0&&<span style={{marginRight:4,background:"#c0392b",color:"#fff",borderRadius:"50%",width:16,height:16,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:".6rem",fontFamily:"DM Sans,sans-serif",fontWeight:700}}>{wishlist.length}</span>}
            </button>
            <button className="nav-link" onClick={()=>{setView("track");setTrackedOrder(null);setTrackSearched(false);}} style={{fontFamily:F,fontSize:isAr?".88rem":".75rem",color:view==="track"?"#8B6914":"#aaa",borderBottom:view==="track"?"2px solid #8B6914":"2px solid transparent",padding:"8px 12px"}}>{t.trackNav}</button>
            <button onClick={()=>setLang(l=>l==="en"?"ar":"en")} style={{background:"#f0e4cc",border:"none",color:"#7a5012",padding:"5px 12px",borderRadius:20,cursor:"pointer",fontFamily:lang==="en"?"Tajawal,sans-serif":"DM Sans,sans-serif",fontSize:".78rem",fontWeight:700,transition:"all .2s",marginRight:4}}>
              {lang==="en"?"عربي":"English"}
            </button>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src={LOGO} alt="HUDA'S" style={{width:48,height:48,borderRadius:"50%",objectFit:"cover",boxShadow:"0 2px 12px rgba(0,0,0,.12)",flexShrink:0,cursor:"pointer"}} onClick={()=>setView("home")}/>
            <div>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.4rem",color:"#4a2e06",letterSpacing:".1em",fontWeight:600,lineHeight:1.1}}>{settings.storeName}</div>
              <div style={{fontSize:".58rem",color:"#c4a56a",letterSpacing:".16em",fontFamily:"DM Sans,sans-serif",marginTop:1}}>{settings.storeTagline}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <a href="https://snapchat.com/t/KurOUTVy" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",background:"#FFFC00",borderRadius:"50%",width:32,height:32,textDecoration:"none",fontSize:"1rem",boxShadow:"0 2px 8px rgba(0,0,0,.1)",flexShrink:0}} title="Snapchat">👻</a>
            <a href="https://www.instagram.com/hudas_abaya_boutique" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",borderRadius:"50%",width:32,height:32,textDecoration:"none",flexShrink:0,boxShadow:"0 2px 8px rgba(0,0,0,.1)"}} title="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@hudas.abaya" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",background:"#000",borderRadius:"50%",width:32,height:32,textDecoration:"none",flexShrink:0,boxShadow:"0 2px 8px rgba(0,0,0,.1)"}} title="TikTok">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
            </a>
            <button onClick={()=>{setAdminPwInput("");setView("admin");}} style={{background:"none",border:"none",cursor:"pointer",color:view==="admin"?"#8B6914":"#bbb",fontSize:"1.1rem",padding:4}}>⚙️</button>
            <button onClick={()=>setView("cart")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:view==="cart"?"#8B6914":"#666",position:"relative",padding:"8px 4px"}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {cartCount>0&&<span style={{position:"absolute",top:-4,right:-6,background:"#3a2006",color:"#fff",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".62rem",fontFamily:"DM Sans,sans-serif",fontWeight:700}}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* ── HOME / HERO ── */}
      {view==="home"&&(
        <div>
          {/* Hero */}
          <div style={{position:"relative",minHeight:"88vh",background:"linear-gradient(135deg,#2a1506 0%,#4a2e10 40%,#3a2008 70%,#1a0d03 100%)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
            {/* Decorative circles */}
            <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",border:"1px solid rgba(212,175,106,.08)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
            <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",border:"1px solid rgba(212,175,106,.12)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
            <div style={{position:"absolute",top:0,right:0,width:"40%",height:"100%",background:"linear-gradient(to left,rgba(196,165,106,.06),transparent)"}}/>
            {/* Floating shapes */}
            <div style={{position:"absolute",top:"15%",right:"8%",width:120,height:120,borderRadius:"50%",background:"rgba(212,175,106,.06)",filter:"blur(20px)"}}/>
            <div style={{position:"absolute",bottom:"20%",left:"5%",width:200,height:200,borderRadius:"50%",background:"rgba(212,175,106,.04)",filter:"blur(30px)"}}/>
            <div style={{textAlign:"center",position:"relative",zIndex:2,padding:"60px 28px",animation:"up .8s ease"}}>
              <div style={{fontFamily:"DM Sans,sans-serif",fontSize:".75rem",letterSpacing:".35em",color:"#c4a56a",textTransform:"uppercase",marginBottom:20}}>{isAr?"تشكيلة جديدة متاحة":"NEW COLLECTION AVAILABLE"}</div>
              <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(2.8rem,7vw,6rem)",color:"#d4af6a",fontWeight:400,fontStyle:"italic",lineHeight:1.1,marginBottom:16,letterSpacing:"-.01em"}}>
                Huda's Abaya
                <br/><span style={{color:"#d4af6a"}}>Elegance in Every Thread</span>
              </h1>
              <div style={{width:60,height:1,background:"linear-gradient(to right,transparent,#c4a56a,transparent)",margin:"20px auto"}}/>

              <button className="btn" onClick={()=>setView("shop")} style={{background:"#d4af6a",color:"#1a0d03",border:"none",padding:"16px 44px",borderRadius:2,cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:".85rem",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase"}}>
                {t.heroBtn}
              </button>
            </div>
          </div>

          {/* Category Quick Links */}
          <div style={{maxWidth:1300,margin:"60px auto 0",padding:"0 28px"}}>
            <div style={{textAlign:"center",marginBottom:40}}>
              <div style={{fontFamily:"DM Sans,sans-serif",fontSize:".72rem",letterSpacing:".25em",color:"#c4a56a",textTransform:"uppercase",marginBottom:8}}>Browse by Category</div>
              <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"2.2rem",color:"#2a1a06",fontStyle:"italic",fontWeight:600}}>Our Collections</h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:16,marginBottom:60}}>
              {ALL_SUBCATS.filter(c=>c!=="All").map(cat=>{
                const count=products.filter(p=>p.subcategory===cat).length;
                return (
                  <div key={cat} onClick={()=>{setFilterCat(cat);setView("shop");}} style={{background:"#fff",borderRadius:14,padding:"24px 16px",textAlign:"center",cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,.05)",transition:"all .25s",border:"1px solid #f0e8da"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(58,32,6,.1)";e.currentTarget.style.borderColor="#d4af6a";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,.05)";e.currentTarget.style.borderColor="#f0e8da";}}>
                    <div style={{fontSize:"2.5rem",marginBottom:10}}>{ICON[cat]||"✨"}</div>
                    <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1rem",fontWeight:600,color:"#2a1a06",marginBottom:4}}>{cat}</div>
                    <div style={{fontFamily:"DM Sans,sans-serif",fontSize:".72rem",color:"#c4a56a"}}>{count} items</div>
                  </div>
                );
              })}
            </div>

            {/* Featured Products */}
            {products.length>0&&(
              <>
                <div style={{textAlign:"center",marginBottom:32}}>
                  <div style={{fontFamily:"DM Sans,sans-serif",fontSize:".72rem",letterSpacing:".25em",color:"#c4a56a",textTransform:"uppercase",marginBottom:8}}>Featured</div>
                  <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"2.2rem",color:"#2a1a06",fontStyle:"italic",fontWeight:600}}>New Arrivals</h2>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:24,marginBottom:60}}>
                  {products.slice(0,4).map((p,i)=><PCard key={p.id} p={p} i={i} t={t} F={F} isAr={isAr} isWished={wishlist.includes(p.id)} rating={ratings[p.id]} onView={()=>{setSelProd(p);setView("product");}} onAdd={()=>{const v=p.variants?.find(v=>v.stock>0);if(v)addToCart(p,v);else toast(t.outOfStock,true);}} onWish={()=>toggleWish(p.id)}/>)}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── SHOP ── */}
      {view==="shop"&&(
        <div style={{maxWidth:1300,margin:"0 auto",padding:"36px 28px"}} className="slide-in">
          <div style={{textAlign:"center",marginBottom:44}}>
            <div style={{fontFamily:"DM Sans,sans-serif",fontSize:".72rem",letterSpacing:".25em",color:"#c4a56a",textTransform:"uppercase",marginBottom:8}}>Modest Fashion</div>
            <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(2rem,4vw,3rem)",color:"#2a1a06",fontWeight:600,fontStyle:"italic"}}>{isAr?"تشكيلتنا":"Our Collection"}</h1>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:4,flexWrap:"wrap",alignItems:"center"}}>
            {ALL_SUBCATS.map(cat=>{
              const count=cat==="All"?products.length:products.filter(p=>p.subcategory===cat).length;
              return <button key={cat} onClick={()=>setFilterCat(cat)} style={{background:filterCat===cat?"#3a2006":"#fff",color:filterCat===cat?"#fff":"#888",border:filterCat===cat?"none":"1px solid #e5d9c8",padding:"8px 18px",borderRadius:30,cursor:"pointer",whiteSpace:"nowrap",fontSize:".78rem",fontFamily:F,fontWeight:600,transition:"all .2s"}}>
                {ICON[cat]||""} {cat} <span style={{opacity:.6,fontSize:".7rem"}}>({count})</span>
              </button>;
            })}
            <div style={{marginRight:"auto",display:"flex",gap:8}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.searchPh} style={{background:"#fff",border:"1px solid #e5d9c8",color:"#1a1208",padding:"8px 16px",borderRadius:30,fontSize:".8rem",fontFamily:F,width:160}}/>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{background:"#fff",border:"1px solid #e5d9c8",color:"#888",padding:"8px 14px",borderRadius:30,fontSize:".78rem",fontFamily:F,cursor:"pointer"}}>
                <option value="default">{t.sort}</option>
                <option value="price_asc">{isAr?"السعر ↑":"Price ↑"}</option>
                <option value="price_desc">{isAr?"السعر ↓":"Price ↓"}</option>
              </select>
            </div>
          </div>
          {filtered.length===0
            ?<div style={{textAlign:"center",padding:"80px 20px",color:"#d4c4a8"}}><div style={{fontSize:"3.5rem",marginBottom:14}}>🌸</div><p style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.4rem",color:"#b09070",fontStyle:"italic"}}>{isAr?"لا توجد منتجات":"No products yet"}</p></div>
            :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:24}}>
              {filtered.map((p,i)=><PCard key={p.id} p={p} i={i} t={t} F={F} isAr={isAr} isWished={wishlist.includes(p.id)} rating={ratings[p.id]} onView={()=>{setSelProd(p);setView("product");}} onAdd={()=>{const v=p.variants?.find(v=>v.stock>0);if(v)addToCart(p,v);else toast(t.outOfStock,true);}} onWish={()=>toggleWish(p.id)}/>)}
            </div>
          }
        </div>
      )}

      {view==="product"&&selProd&&<PDetail p={selProd} t={t} F={F} isAr={isAr} isWished={wishlist.includes(selProd.id)} rating={ratings[selProd.id]} products={products} onBack={()=>setView("shop")} onAdd={v=>addToCart(selProd,v)} onWish={()=>toggleWish(selProd.id)} onRate={stars=>rateProduct(selProd.id,stars)} onViewSimilar={p=>{setSelProd(p);}}/>}

      {/* ── WISHLIST ── */}
      {view==="wishlist"&&(
        <div style={{maxWidth:1300,margin:"40px auto",padding:"0 28px"}} className="slide-in">
          <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"2rem",fontWeight:600,color:"#2a1a06",marginBottom:28,fontStyle:"italic"}}>❤️ {t.wishlistNav}</h2>
          {wishlist.length===0
            ?<div style={{textAlign:"center",padding:"80px",color:"#d4c4a8"}}><div style={{fontSize:"3rem",marginBottom:12}}>🤍</div><p style={{fontFamily:F,fontSize:"1rem"}}>{isAr?"قائمة المفضلة فارغة":"Your wishlist is empty"}</p></div>
            :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:24}}>
              {products.filter(p=>wishlist.includes(p.id)).map((p,i)=><PCard key={p.id} p={p} i={i} t={t} F={F} isAr={isAr} isWished={true} rating={ratings[p.id]} onView={()=>{setSelProd(p);setView("product");}} onAdd={()=>{const v=p.variants?.find(v=>v.stock>0);if(v)addToCart(p,v);else toast(t.outOfStock,true);}} onWish={()=>toggleWish(p.id)}/>)}
            </div>
          }
        </div>
      )}

      {/* ── TRACK ORDER ── */}
      {view==="track"&&(
        <div style={{maxWidth:600,margin:"60px auto",padding:"0 28px"}} className="slide-in">
          <div style={{background:"#fff",borderRadius:20,padding:"40px 36px",boxShadow:"0 4px 32px rgba(0,0,0,.07)"}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{fontSize:"2.5rem",marginBottom:10}}>📦</div>
              <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.8rem",fontWeight:600,color:"#2a1a06",fontStyle:"italic"}}>{t.trackTitle}</h2>
            </div>
            <div style={{display:"flex",gap:10}}>
              <input value={trackId} onChange={e=>setTrackId(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(()=>{const o=orders.find(o=>o.id===trackId.trim());setTrackedOrder(o||null);setTrackSearched(true);})()}
                placeholder={t.trackPh} style={{flex:1,background:"#faf7f2",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"12px 16px",borderRadius:10,fontFamily:F,fontSize:".9rem",direction:"ltr"}}/>
              <button className="btn" onClick={()=>{const o=orders.find(o=>o.id===trackId.trim());setTrackedOrder(o||null);setTrackSearched(true);}} style={{background:"#3a2006",color:"#fff",border:"none",padding:"12px 22px",borderRadius:10,cursor:"pointer",fontFamily:F,fontWeight:600}}>{t.trackBtn}</button>
            </div>
            {trackSearched&&(
              trackedOrder
                ?<div style={{marginTop:24,background:"#f5f9f0",borderRadius:12,padding:"20px",border:"1px solid #c8e6c9"}}>
                  <div style={{fontFamily:F,fontWeight:700,color:"#2e7d32",marginBottom:10}}>✅ {t.trackFound}</div>
                  <div style={{fontFamily:F,fontSize:".85rem",color:"#555",lineHeight:1.8}}>
                    <div><strong>{t.orderNum}{trackedOrder.id}</strong></div>
                    <div>👤 {trackedOrder.name}</div>
                    <div>📍 {trackedOrder.address1}, {trackedOrder.city}, {trackedOrder.state}</div>
                    <div>📅 {trackedOrder.date}</div>
                    <div>💰 {USD(trackedOrder.total)}</div>
                  </div>
                </div>
                :<div style={{marginTop:24,background:"#fff5f5",borderRadius:12,padding:"20px",border:"1px solid #ffcdd2",textAlign:"center",fontFamily:F,color:"#c62828"}}>❌ {t.trackNotFound}</div>
            )}
          </div>
        </div>
      )}

      {view==="cart"&&<CartPage cart={cart} total={cartTotal} t={t} F={F} isAr={isAr} remove={removeFromCart} updQ={updateQty} onBack={()=>setView("shop")} onCheckout={()=>setView("checkout")}/>}
      {view==="checkout"&&<CheckoutPage cart={cart} total={cartTotal} t={t} F={F} isAr={isAr} settings={settings} onBack={()=>setView("cart")} onOrder={info=>{const id=placeOrder(info);setView("home");toast(`🎉 ${t.orderNum}${id}`);}}/>}

      {/* ── ADMIN LOCK ── */}
      {view==="admin"&&!adminUnlocked&&(
        <div style={{maxWidth:380,margin:"80px auto",padding:"0 28px"}} className="slide-in">
          <div style={{background:"#fff",borderRadius:20,padding:"40px 32px",boxShadow:"0 4px 32px rgba(0,0,0,.07)",textAlign:"center"}}>
            <div style={{fontSize:"2.5rem",marginBottom:16}}>🔒</div>
            <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.6rem",fontWeight:600,color:"#2a1a06",marginBottom:20,fontStyle:"italic"}}>{t.adminPanel}</h2>
            <input type="password" value={adminPwInput} onChange={e=>setAdminPwInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"){if(adminPwInput===settings.adminPassword)setAdminUnlocked(true);else toast(isAr?"كلمة سر غلط ❌":"Wrong password ❌",true);}}}
              placeholder={isAr?"كلمة السر":"Password"}
              style={{width:"100%",background:"#faf7f2",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"12px 16px",borderRadius:10,fontFamily:"DM Sans,sans-serif",fontSize:"1rem",marginBottom:14,textAlign:"center",letterSpacing:".2em"}}/>
            <button className="btn" onClick={()=>{if(adminPwInput===settings.adminPassword)setAdminUnlocked(true);else toast(isAr?"كلمة سر غلط ❌":"Wrong password ❌",true);}} style={{width:"100%",background:"#3a2006",color:"#fff",border:"none",padding:"13px",borderRadius:10,cursor:"pointer",fontFamily:F,fontSize:"1rem",fontWeight:600}}>
              {t.backAdmin==="رجوع"?"دخول":"Enter"}
            </button>
            <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:"#c4a56a",cursor:"pointer",fontFamily:F,fontSize:".82rem",marginTop:14}}>{t.backAdmin}</button>
          </div>
        </div>
      )}
      {view==="admin"&&adminUnlocked&&<AdminPage products={products} orders={orders} settings={settings} t={t} F={F} isAr={isAr} form={form} setForm={setForm} vForm={vForm} setVForm={setVForm} editProd={editProd} setEditProd={setEditProd} emptyForm={emptyForm} adminTab={adminTab} setAdminTab={setAdminTab} sizePresets={sizePresets} onSave={handleSave} onDelete={handleDelete} onStartEdit={startEdit} onAddVar={addVariant} onRemoveVar={removeVariant} onUpdateVarStock={updateVarStock} onAddImage={addImage} onRemoveImage={removeImage} onSaveSettings={saveS} onLogout={()=>{setAdminUnlocked(false);setView("home");}} onExport={exportOrders} toast={toast}/>}
    </div>
  );
}

/* ─── PRODUCT CARD ──────────────────────────────────────────────── */
function PCard({p,i,t,F,isAr,isWished,rating,onView,onAdd,onWish}) {
  const stock=totalStock(p);
  const disc=p.originalPrice?Math.round((1-p.price/p.originalPrice)*100):0;
  const img=firstImg(p);
  const countdown=useCountdown(p.saleEndDate);
  return (
    <div className="card" style={{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.06)",animation:`up .4s ease ${i*.04}s both`,position:"relative"}}>
      <div onClick={onView} style={{position:"relative",height:280,background:"linear-gradient(135deg,#f5ede0,#ede0cc)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
        {img?<img src={img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s"}} onMouseEnter={e=>e.target.style.transform="scale(1.04)"} onMouseLeave={e=>e.target.style.transform="scale(1)"} onError={e=>e.target.style.display="none"}/>
          :<span style={{fontSize:"5.5rem"}}>{ICON[p.subcategory]||"👗"}</span>}
        {disc>0&&<div style={{position:"absolute",top:12,left:12,background:"#c0392b",color:"#fff",fontSize:".65rem",fontFamily:"DM Sans,sans-serif",fontWeight:700,padding:"4px 12px",borderRadius:20}}>-{disc}%</div>}
        {stock===0&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:F,fontWeight:600}}>{t.outOfStock}</div>}
        {stock>0&&stock<=5&&<div style={{position:"absolute",top:12,right:44,background:"rgba(127,68,0,.92)",color:"#ffb347",fontSize:".62rem",fontFamily:"DM Sans,sans-serif",padding:"3px 10px",borderRadius:20,fontWeight:600}}>{t.onlyLeft(stock)}</div>}
        {/* Wishlist heart */}
        <button className="heart" onClick={e=>{e.stopPropagation();onWish();}} style={{position:"absolute",top:10,right:10,background:"rgba(255,255,255,.9)",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1rem",boxShadow:"0 2px 8px rgba(0,0,0,.1)"}}>
          {isWished?"❤️":"🤍"}
        </button>
        {/* Countdown badge */}
        {countdown&&<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(58,32,6,.85)",color:"#d4af6a",fontFamily:"DM Sans,sans-serif",fontSize:".68rem",padding:"6px 12px",textAlign:"center",fontWeight:600,letterSpacing:".04em"}}>
          ⏱️ {t.saleEnds}: {countdown.d}{t.days} {countdown.h}{t.hours} {countdown.m}{t.mins} {countdown.s}{t.secs}
        </div>}
      </div>
      <div style={{padding:"16px 18px"}}>
        <div style={{display:"flex",gap:5,marginBottom:6}}><span className="tag" style={{fontFamily:F}}>{p.subcategory}</span>{p.type&&<span className="tag" style={{fontFamily:F,background:"#f5f0e8",color:"#9a7030"}}>{p.type}</span>}</div>
        <div onClick={onView} style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.1rem",fontWeight:600,marginBottom:6,lineHeight:1.3,cursor:"pointer",color:"#2a1a06"}}>{p.name}</div>
        {rating?.stars&&<Stars rating={rating.stars} size={13}/>}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:10}}>
          <div>
            <span style={{color:"#8B6914",fontFamily:"DM Sans,sans-serif",fontWeight:700,fontSize:"1.05rem"}}>{USD(p.price)}</span>
            {p.originalPrice&&<span style={{color:"#ddd",fontFamily:"DM Sans,sans-serif",fontSize:".8rem",textDecoration:"line-through",marginRight:6}}>{USD(p.originalPrice)}</span>}
          </div>
          <button className="btn" onClick={onAdd} disabled={stock===0} style={{background:stock===0?"#eee":"#3a2006",color:stock===0?"#bbb":"#fff",border:"none",padding:"8px 14px",borderRadius:8,cursor:stock===0?"default":"pointer",fontFamily:F,fontSize:".78rem",fontWeight:600}}>
            {stock===0?t.soldOut:t.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT DETAIL ────────────────────────────────────────────── */
function PDetail({p,t,F,isAr,isWished,rating,products,onBack,onAdd,onWish,onRate,onViewSimilar}) {
  const [imgIdx,setImgIdx]=useState(0);
  const imgs=p.imageUrls||[];
  const colors=[...new Set((p.variants||[]).map(v=>v.color))];
  const [selColor,setSelColor]=useState(colors[0]||"");
  const sizesForColor=(p.variants||[]).filter(v=>v.color===selColor);
  const [selSize,setSelSize]=useState(sizesForColor[0]?.size||"");
  const selV=getVariant(p,selSize,selColor);
  const [done,setDone]=useState(false);
  const countdown=useCountdown(p.saleEndDate);
  const similar=products.filter(x=>x.id!==p.id&&(x.subcategory===p.subcategory||x.type===p.type)).slice(0,4);
  const disc=p.originalPrice?Math.round((1-p.price/p.originalPrice)*100):0;

  const shareWA=()=>{
    const msg=encodeURIComponent(`🛍️ Check out this product!\n${p.name}\n${USD(p.price)}\nShop now!`);
    window.open(`https://wa.me/?text=${msg}`,"_blank");
  };

  return (
    <div style={{maxWidth:1100,margin:"40px auto",padding:"0 28px"}} className="slide-in">
      <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:"#c4a56a",fontFamily:F,fontSize:".85rem",marginBottom:28,display:"flex",alignItems:"center",gap:8}}>{t.back}</button>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,marginBottom:60}}>
        {/* Image Gallery */}
        <div>
          <div style={{position:"relative",height:480,background:"linear-gradient(135deg,#f5ede0,#ede0cc)",borderRadius:16,overflow:"hidden",marginBottom:12}}>
            {imgs.length>0
              ?<img src={imgs[imgIdx]} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
              :<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",fontSize:"8rem"}}>{ICON[p.subcategory]||"👗"}</div>}
            {disc>0&&<div style={{position:"absolute",top:16,left:16,background:"#c0392b",color:"#fff",fontSize:".75rem",fontFamily:"DM Sans,sans-serif",fontWeight:700,padding:"5px 14px",borderRadius:20}}>-{disc}%</div>}
            <button className="heart" onClick={onWish} style={{position:"absolute",top:14,right:14,background:"rgba(255,255,255,.92)",border:"none",borderRadius:"50%",width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1.2rem",boxShadow:"0 2px 10px rgba(0,0,0,.1)"}}>
              {isWished?"❤️":"🤍"}
            </button>
            {imgs.length>1&&<>
              <button onClick={()=>setImgIdx(i=>Math.max(0,i-1))} style={{position:"absolute",top:"50%",left:10,transform:"translateY(-50%)",background:"rgba(255,255,255,.8)",border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:"1rem"}}>‹</button>
              <button onClick={()=>setImgIdx(i=>Math.min(imgs.length-1,i+1))} style={{position:"absolute",top:"50%",right:10,transform:"translateY(-50%)",background:"rgba(255,255,255,.8)",border:"none",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:"1rem"}}>›</button>
            </>}
          </div>
          {imgs.length>1&&<div style={{display:"flex",gap:8,overflowX:"auto"}}>
            {imgs.map((src,i)=><img key={i} src={src} onClick={()=>setImgIdx(i)} style={{width:68,height:68,objectFit:"cover",borderRadius:8,cursor:"pointer",border:`2px solid ${imgIdx===i?"#3a2006":"transparent"}`,flexShrink:0,transition:"border-color .2s"}} onError={e=>e.target.style.display="none"}/>)}
          </div>}
        </div>
        {/* Info */}
        <div>
          <div style={{display:"flex",gap:6,marginBottom:12}}><span className="tag" style={{fontFamily:F}}>{p.subcategory}</span>{p.type&&<span className="tag" style={{fontFamily:F,background:"#f5f0e8",color:"#9a7030"}}>{p.type}</span>}</div>
          <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"2rem",fontWeight:600,color:"#2a1a06",marginBottom:8,lineHeight:1.2}}>{p.name}</h1>
          {rating?.stars&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><Stars rating={rating.stars} size={16}/><span style={{fontFamily:F,fontSize:".8rem",color:"#aaa"}}>{rating.stars}/5</span></div>}
          {!rating?.rated&&(
            <div style={{marginBottom:12}}>
              <div style={{fontFamily:F,fontSize:".75rem",color:"#c4a56a",marginBottom:4}}>{t.rateTitle}</div>
              <Stars rating={0} onRate={onRate} size={20}/>
            </div>
          )}
          <p style={{color:"#888",fontFamily:F,fontSize:".88rem",lineHeight:1.7,marginBottom:16}}>{p.description}</p>
          {countdown&&<div style={{background:"linear-gradient(135deg,#3a2006,#5a3010)",color:"#d4af6a",fontFamily:"DM Sans,sans-serif",fontSize:".78rem",padding:"10px 16px",borderRadius:10,marginBottom:16,fontWeight:600,letterSpacing:".04em"}}>
            ⏱️ {t.saleEnds}: {countdown.d}{t.days} {countdown.h}{t.hours} {countdown.m}{t.mins} {countdown.s}{t.secs}
          </div>}
          <div style={{display:"flex",gap:12,marginBottom:24,alignItems:"baseline"}}>
            <span style={{color:"#8B6914",fontFamily:"DM Sans,sans-serif",fontWeight:700,fontSize:"1.6rem"}}>{USD(p.price)}</span>
            {p.originalPrice&&<span style={{color:"#ccc",fontFamily:"DM Sans,sans-serif",textDecoration:"line-through",fontSize:".95rem"}}>{USD(p.originalPrice)}</span>}
          </div>
          {/* Color */}
          {colors.length>0&&<div style={{marginBottom:18}}>
            <div style={{color:"#aaa",fontSize:".72rem",fontFamily:F,letterSpacing:".1em",textTransform:"uppercase",marginBottom:8}}>{t.color}: <span style={{color:"#5a3e10",fontWeight:600}}>{selColor}</span></div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {colors.map(c=><button key={c} onClick={()=>{setSelColor(c);setSelSize((p.variants||[]).find(v=>v.color===c)?.size||"");}} style={{background:selColor===c?"#3a2006":"#fff",color:selColor===c?"#fff":"#777",border:"1.5px solid",borderColor:selColor===c?"#3a2006":"#e5d9c8",padding:"7px 16px",borderRadius:8,cursor:"pointer",fontFamily:F,fontSize:".82rem",fontWeight:500,transition:"all .2s"}}>{c}</button>)}
            </div>
          </div>}
          {/* Size */}
          {sizesForColor.length>0&&<div style={{marginBottom:18}}>
            <div style={{color:"#aaa",fontSize:".72rem",fontFamily:F,letterSpacing:".1em",textTransform:"uppercase",marginBottom:8}}>{t.size}: <span style={{color:"#5a3e10",fontWeight:600}}>{selSize}</span></div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {sizesForColor.map(v=><button key={v.size} onClick={()=>setSelSize(v.size)} disabled={v.stock===0} style={{background:selSize===v.size?"#3a2006":"#fff",color:selSize===v.size?"#fff":v.stock===0?"#ccc":"#777",border:"1.5px solid",borderColor:selSize===v.size?"#3a2006":v.stock===0?"#eee":"#e5d9c8",padding:"7px 16px",borderRadius:8,cursor:v.stock===0?"default":"pointer",fontFamily:F,fontSize:".82rem",opacity:v.stock===0?.5:1,transition:"all .2s"}}>{v.size}{v.stock===0?" ✗":""}</button>)}
            </div>
          </div>}
          {selV&&<div style={{color:"#c4a56a",fontSize:".8rem",fontFamily:F,marginBottom:20}}>{t.inStock(selV.stock,isAr?"الشحن داخل أمريكا فقط":t.inStockSub)}</div>}
          <button className="btn" onClick={()=>{if(!selV||selV.stock===0)return;onAdd(selV);setDone(true);setTimeout(()=>setDone(false),1400);}} disabled={!selV||selV?.stock===0}
            style={{width:"100%",background:done?"#1a3a1f":(!selV||selV?.stock===0?"#eee":"#3a2006"),color:done?"#4caf50":"#fff",border:"none",padding:"16px",borderRadius:12,cursor:"pointer",fontFamily:F,fontSize:"1rem",fontWeight:600,marginBottom:12,transition:"all .3s"}}>
            {done?t.addedToCart:!selV||selV?.stock===0?t.soldOut:t.addToCart}
          </button>
          <button onClick={shareWA} style={{width:"100%",background:"#25D366",color:"#fff",border:"none",padding:"12px",borderRadius:12,cursor:"pointer",fontFamily:F,fontSize:".88rem",fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.background="#1ebe5d"} onMouseLeave={e=>e.currentTarget.style.background="#25D366"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {t.shareWA}
          </button>
        </div>
      </div>
      {/* Similar Products */}
      {similar.length>0&&(
        <div style={{marginBottom:40}}>
          <div style={{marginBottom:24,textAlign:"center"}}>
            <div style={{fontFamily:"DM Sans,sans-serif",fontSize:".72rem",letterSpacing:".25em",color:"#c4a56a",textTransform:"uppercase",marginBottom:6}}>More to love</div>
            <h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.8rem",fontWeight:600,color:"#2a1a06",fontStyle:"italic"}}>{t.similarTitle}</h3>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20}}>
            {similar.map((sp,i)=><PCard key={sp.id} p={sp} i={i} t={t} F={F} isAr={isAr} isWished={false} rating={null} onView={()=>onViewSimilar(sp)} onAdd={()=>{const v=sp.variants?.find(v=>v.stock>0);if(v){/* add via parent */}}} onWish={()=>{}}/>)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── CART ──────────────────────────────────────────────────────── */
function CartPage({cart,total,t,F,isAr,remove,updQ,onBack,onCheckout}) {
  return (
    <div style={{maxWidth:720,margin:"40px auto",padding:"0 28px"}} className="slide-in">
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:30}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:"#c4a56a",fontSize:"1.2rem"}}>←</button>
        <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.8rem",fontWeight:600,color:"#2a1a06",fontStyle:"italic"}}>{t.bag}</h2>
        {cart.length>0&&<span style={{fontFamily:F,color:"#aaa",fontSize:".85rem"}}>{t.items(cart.reduce((s,i)=>s+i.qty,0))}</span>}
      </div>
      {cart.length===0
        ?<div style={{textAlign:"center",padding:"80px 20px",color:"#d4c4a8"}}><div style={{fontSize:"3rem",marginBottom:12}}>🛍️</div><p style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.4rem",color:"#b09070",fontStyle:"italic",marginBottom:20}}>{t.emptyBag}</p><button className="btn" onClick={onBack} style={{background:"#3a2006",color:"#fff",border:"none",padding:"12px 28px",borderRadius:30,cursor:"pointer",fontFamily:F,fontWeight:600}}>{t.continueShopping}</button></div>
        :<>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
            {cart.map(item=>(
              <div key={item.key} style={{background:"#fff",borderRadius:14,padding:"14px 18px",display:"flex",gap:14,alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
                <div style={{width:60,height:60,background:"#f5ede0",borderRadius:10,overflow:"hidden",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {firstImg(item)?<img src={firstImg(item)} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:"1.7rem"}}>{ICON[item.subcategory]||"👗"}</span>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1rem",fontWeight:600,marginBottom:2}}>{item.name}</div>
                  <div style={{color:"#c4a56a",fontSize:".75rem",fontFamily:F}}>{item.variantSize} · {item.variantColor}</div>
                  <div style={{color:"#8B6914",fontFamily:"DM Sans,sans-serif",fontWeight:700,marginTop:3}}>{USD(item.price)}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <button onClick={()=>updQ(item.key,item.qty-1)} style={{background:"#f0e4cc",border:"none",color:"#5a3e10",width:28,height:28,borderRadius:"50%",cursor:"pointer",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                  <span style={{fontFamily:"DM Sans,sans-serif",minWidth:20,textAlign:"center",fontWeight:600}}>{item.qty}</span>
                  <button onClick={()=>updQ(item.key,item.qty+1)} style={{background:"#f0e4cc",border:"none",color:"#5a3e10",width:28,height:28,borderRadius:"50%",cursor:"pointer",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                </div>
                <button onClick={()=>remove(item.key)} style={{background:"none",border:"none",color:"#ccc",cursor:"pointer",fontSize:"1rem",padding:"4px 8px"}}>✕</button>
              </div>
            ))}
          </div>
          <div style={{background:"#fff",borderRadius:14,padding:"20px 22px",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontFamily:F,fontSize:".88rem",color:"#aaa",marginBottom:8}}><span>{t.subtotal}</span><span>{USD(total)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontFamily:F,fontSize:".88rem",color:"#4caf50",fontWeight:600,marginBottom:18}}><span>{t.shipping}</span><span>{t.freeShip}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid #f0e8da",paddingTop:14,marginBottom:18,fontFamily:"Cormorant Garamond,serif",fontSize:"1.2rem",fontWeight:600}}><span>{t.total}</span><span style={{color:"#8B6914"}}>{USD(total)}</span></div>
            <button className="btn" onClick={onCheckout} style={{width:"100%",background:"#3a2006",color:"#fff",border:"none",padding:"15px",borderRadius:12,cursor:"pointer",fontFamily:F,fontSize:".95rem",fontWeight:600}}>{t.checkout}</button>
          </div>
        </>
      }
    </div>
  );
}

/* ─── CHECKOUT ──────────────────────────────────────────────────── */
function CheckoutPage({cart,total,t,F,isAr,settings,onBack,onOrder}) {
  const [step,setStep]=useState("info");
  const [info,setInfo]=useState({name:"",email:"",phone:"",address1:"",address2:"",city:"",state:"CA",zip:""});
  const paypalRef=useRef(null);
  const [ppErr,setPpErr]=useState(false);
  const ok=()=>info.name&&info.email&&info.address1&&info.city&&info.zip;
  useEffect(()=>{
    if(step!=="payment"||!settings.paypalClientId)return;
    const render=()=>{
      if(!paypalRef.current||!window.paypal)return;
      paypalRef.current.innerHTML="";
      window.paypal.Buttons({style:{layout:"vertical",color:"gold",shape:"rect",label:"pay"},createOrder:(_,a)=>a.order.create({purchase_units:[{amount:{value:total.toFixed(2)},description:`${settings.storeName} Order`}]}),onApprove:async(_,a)=>{await a.order.capture();onOrder(info);},onError:()=>setPpErr(true)}).render(paypalRef.current);
    };
    if(window.paypal){render();return;}
    const s=document.createElement("script");s.src=`https://www.paypal.com/sdk/js?client-id=${settings.paypalClientId}&currency=USD`;s.async=true;s.onload=render;s.onerror=()=>setPpErr(true);document.head.appendChild(s);
  },[step]);
  return (
    <div style={{maxWidth:720,margin:"40px auto",padding:"0 28px"}} className="slide-in">
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
        <button onClick={step==="payment"?()=>setStep("info"):onBack} style={{background:"none",border:"none",cursor:"pointer",color:"#c4a56a",fontSize:"1.2rem"}}>←</button>
        <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.8rem",fontWeight:600,color:"#2a1a06",fontStyle:"italic"}}>{step==="info"?t.shippingInfo:t.payment}</h2>
        <div style={{marginRight:"auto",display:"flex",alignItems:"center",gap:8,fontFamily:F,fontSize:".75rem",color:"#c4a56a"}}>
          <span style={{width:22,height:22,borderRadius:"50%",background:step==="info"?"#3a2006":"#d4af6a",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:".7rem"}}>1</span>
          <span style={{width:20,height:1,background:"#e5d9c8",display:"inline-block"}}/>
          <span style={{width:22,height:22,borderRadius:"50%",background:step==="payment"?"#3a2006":"#e5d9c8",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:".7rem"}}>2</span>
        </div>
      </div>
      <div style={{background:"#fff",borderRadius:12,padding:"14px 18px",marginBottom:20,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
        {cart.map(i=><div key={i.key} style={{display:"flex",justifyContent:"space-between",fontFamily:F,fontSize:".82rem",color:"#aaa",marginBottom:3}}><span>{i.name} ({i.variantSize}/{i.variantColor}) ×{i.qty}</span><span style={{color:"#5a3e10",fontWeight:600}}>{USD(i.price*i.qty)}</span></div>)}
        <div style={{borderTop:"1px solid #f0e8da",paddingTop:10,marginTop:8,display:"flex",justifyContent:"space-between",fontFamily:"Cormorant Garamond,serif",fontSize:"1.05rem",fontWeight:600}}><span>{t.total}</span><span style={{color:"#8B6914"}}>{USD(total)}</span></div>
      </div>
      {step==="info"&&(
        <div style={{background:"#fff",borderRadius:16,padding:"26px",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[[t.fullName,"name","text",true],[t.email,"email","email",true],[t.phone,"phone","tel",true],[t.addr1,"address1","text",true],[t.addr2,"address2","text",true],[t.city,"city","text",false],[t.zip,"zip","text",false]].map(([l,f,tp,full])=>(
              <div key={f} style={{gridColumn:full?"1/-1":undefined}}>
                <label style={{display:"block",color:"#c4a56a",fontSize:".7rem",fontFamily:F,letterSpacing:".1em",textTransform:"uppercase",marginBottom:5}}>{l}</label>
                <input type={tp} value={info[f]} onChange={e=>setInfo({...info,[f]:e.target.value})} style={{width:"100%",background:"#faf7f2",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"10px 13px",borderRadius:8,fontFamily:F,fontSize:".88rem"}}/>
              </div>
            ))}
            <div><label style={{display:"block",color:"#c4a56a",fontSize:".7rem",fontFamily:F,letterSpacing:".1em",textTransform:"uppercase",marginBottom:5}}>{t.state}</label><select value={info.state} onChange={e=>setInfo({...info,state:e.target.value})} style={{width:"100%",background:"#faf7f2",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"10px 13px",borderRadius:8,fontFamily:F,fontSize:".88rem",cursor:"pointer"}}>{US_STATES.map(s=><option key={s}>{s}</option>)}</select></div>
          </div>
          <button className="btn" onClick={()=>{if(!ok())return alert(t.fillFields);setStep("payment");}} style={{width:"100%",marginTop:22,background:"#3a2006",color:"#fff",border:"none",padding:"14px",borderRadius:12,cursor:"pointer",fontFamily:F,fontSize:".95rem",fontWeight:600}}>{t.contPayment}</button>
        </div>
      )}
      {step==="payment"&&(
        <div style={{background:"#fff",borderRadius:16,padding:"26px",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
          <div style={{background:"#faf7f2",borderRadius:10,padding:"12px 16px",marginBottom:18,fontFamily:F,fontSize:".82rem",color:"#888"}}>📦 {info.name} · {info.address1}, {info.city}, {info.state} {info.zip}</div>
          {!settings.paypalClientId
            ?<div style={{textAlign:"center",padding:"28px",background:"#fff8f0",borderRadius:12,border:"1.5px dashed #e0c090"}}><div style={{fontSize:"2.5rem",marginBottom:10}}>⚠️</div><p style={{fontFamily:"Cormorant Garamond,serif",color:"#5a3e10",fontSize:"1.1rem",marginBottom:6}}>{t.ppNotConf}</p><p style={{fontFamily:F,color:"#aaa",fontSize:".82rem"}}>{t.ppHint}</p></div>
            :<div><p style={{textAlign:"center",color:"#c4a56a",fontFamily:F,fontSize:".78rem",marginBottom:14}}>{t.secPay}</p><div ref={paypalRef} style={{minHeight:50}}/>{ppErr&&<p style={{color:"#c0392b",fontFamily:F,fontSize:".82rem",textAlign:"center",marginTop:10}}>❌ {t.ppHint}</p>}</div>
          }
        </div>
      )}
    </div>
  );
}

/* ─── ADMIN ──────────────────────────────────────────────────────── */
function AdminPage({products,orders,settings,t,F,isAr,form,setForm,vForm,setVForm,editProd,setEditProd,emptyForm,adminTab,setAdminTab,sizePresets,onSave,onDelete,onStartEdit,onAddVar,onRemoveVar,onUpdateVarStock,onAddImage,onRemoveImage,onSaveSettings,onLogout,onExport,toast}) {
  const [sf,setSf]=useState(settings);
  const revenue=orders.reduce((s,o)=>s+o.total,0);
  const totalInv=products.reduce((s,p)=>s+totalStock(p),0);

  const handleUpload=e=>{
    const file=e.target.files[0];if(!file)return;
    if(file.size>3*1024*1024){alert(isAr?"الصورة أكبر من 3MB":"Max 3MB");return;}
    const reader=new FileReader();
    reader.onload=ev=>onAddImage(ev.target.result);
    reader.readAsDataURL(file);e.target.value="";
  };

  return (
    <div dir={isAr?"rtl":"ltr"} style={{maxWidth:1200,margin:"30px auto",padding:"0 28px"}} className="slide-in">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:26}}>
        <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"2rem",fontWeight:600,color:"#2a1a06",fontStyle:"italic"}}>{t.adminPanel}</h2>
        <button onClick={onLogout} style={{background:"#fef2f2",border:"none",color:"#c0392b",padding:"8px 18px",borderRadius:20,cursor:"pointer",fontFamily:F,fontSize:".82rem",fontWeight:600}}>🔒 {t.logout}</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:28}}>
        {[[t.sProd,products.length,"📦"],[t.sStock,totalInv,"🏷️"],[t.sOrders,orders.length,"🛍️"],[t.sRev,"$"+revenue.toFixed(2),"💰"]].map(([l,v,ic])=>(
          <div key={l} style={{background:"#fff",borderRadius:14,padding:"18px 20px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
            <div style={{fontSize:"1.5rem",marginBottom:6}}>{ic}</div>
            <div style={{color:"#8B6914",fontSize:"1.5rem",fontFamily:"DM Sans,sans-serif",fontWeight:700}}>{v}</div>
            <div style={{color:"#c4a56a",fontSize:".72rem",fontFamily:F,marginTop:4}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:4,marginBottom:24,background:"#fff",borderRadius:12,padding:4,width:"fit-content",boxShadow:"0 2px 8px rgba(0,0,0,.04)",flexWrap:"wrap"}}>
        {[[t.dashTab,"dashboard"],[t.prodsTab,"products"],[t.ordersTab,"orders"],[t.setTab,"settings"]].map(([l,tab])=>(
          <button key={tab} onClick={()=>setAdminTab(tab)} style={{background:adminTab===tab?"#3a2006":"transparent",color:adminTab===tab?"#fff":"#aaa",border:"none",padding:"9px 16px",borderRadius:9,cursor:"pointer",fontFamily:F,fontSize:".82rem",fontWeight:600,transition:"all .2s",whiteSpace:"nowrap"}}>{l}</button>
        ))}
      </div>

      {/* DASHBOARD */}
      {adminTab==="dashboard"&&(
        <div>
          {["Women's Abayas","Girls' Abayas","Women's Hijabs","Girls' Hijabs","Makeup","Skincare"].map(subcat=>{
            const prods=products.filter(p=>p.subcategory===subcat);if(!prods.length)return null;
            return (
              <div key={subcat} style={{background:"#fff",borderRadius:14,overflow:"hidden",marginBottom:20,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
                <div style={{padding:"14px 20px",borderBottom:"1px solid #f5ede0",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#faf7f2"}}>
                  <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.1rem",fontWeight:600,color:"#2a1a06"}}>{ICON[subcat]} {subcat}</div>
                  <span style={{fontFamily:F,fontSize:".75rem",color:"#c4a56a"}}>{prods.length} · {prods.reduce((s,p)=>s+totalStock(p),0)} {t.vmPcs}</span>
                </div>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:"#fdf9f4"}}>{[t.colProd,t.colType,t.colColors,t.colSizes,t.colTotal,t.colDetail].map(h=><th key={h} style={{padding:"10px 16px",textAlign:"right",fontFamily:F,fontSize:".72rem",color:"#c4a56a",fontWeight:600,borderBottom:"1px solid #f5ede0"}}>{h}</th>)}</tr></thead>
                  <tbody>
                    {prods.map((p,i)=>{
                      const colors=[...new Set((p.variants||[]).map(v=>v.color))];
                      const sizes=[...new Set((p.variants||[]).map(v=>v.size))];
                      const stock=totalStock(p);
                      return <tr key={p.id} style={{borderBottom:i<prods.length-1?"1px solid #faf5ef":"none",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fdf9f4"} onMouseLeave={e=>e.currentTarget.style.background=""}>
                        <td style={{padding:"12px 16px",fontFamily:"Cormorant Garamond,serif",fontSize:".95rem",fontWeight:600,color:"#2a1a06"}}>{p.name}</td>
                        <td style={{padding:"12px 16px"}}><span className="tag" style={{fontFamily:F}}>{p.type}</span></td>
                        <td style={{padding:"12px 16px"}}><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{colors.map(c=><span key={c} style={{fontFamily:F,fontSize:".72rem",background:"#f0e4cc",color:"#7a5012",padding:"2px 8px",borderRadius:20}}>{c}</span>)}</div></td>
                        <td style={{padding:"12px 16px"}}><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{sizes.map(s=><span key={s} style={{fontFamily:F,fontSize:".72rem",background:"#f5f0e8",color:"#9a7030",padding:"2px 8px",borderRadius:20}}>{s}</span>)}</div></td>
                        <td style={{padding:"12px 16px",textAlign:"center"}}><span style={{fontFamily:"DM Sans,sans-serif",fontWeight:700,fontSize:"1rem",color:stock===0?"#c0392b":stock<=5?"#e67e22":"#27ae60"}}>{stock}</span></td>
                        <td style={{padding:"12px 16px"}}><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{(p.variants||[]).map(v=><span key={v.id} style={{fontFamily:"DM Sans,sans-serif",fontSize:".65rem",background:v.stock===0?"#fef2f2":"#f0f9f0",color:v.stock===0?"#c0392b":"#27ae60",padding:"2px 7px",borderRadius:20,border:"1px solid",borderColor:v.stock===0?"#fde8e8":"#d4edda"}}>{v.size}/{v.color}:{v.stock}</span>)}</div></td>
                      </tr>;
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
          {products.length===0&&<div style={{textAlign:"center",padding:"60px",color:"#d4c4a8",fontFamily:"Cormorant Garamond,serif",fontSize:"1.3rem",fontStyle:"italic"}}>{isAr?"لا توجد منتجات بعد":"No products yet"}</div>}
        </div>
      )}

      {/* PRODUCTS FORM */}
      {adminTab==="products"&&(
        <>
          <div style={{background:"#fff",borderRadius:16,padding:"24px",marginBottom:24,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.2rem",fontWeight:600,color:"#2a1a06"}}>{editProd?t.editProd:t.newProd}</h3>
              {editProd&&<button onClick={()=>{setEditProd(null);setForm(emptyForm);}} style={{background:"none",border:"none",color:"#c4a56a",cursor:"pointer",fontFamily:F,fontSize:".82rem"}}>{t.cancelEdit}</button>}
            </div>
            {/* Category selects */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
              {[[t.catLabel,"category",Object.keys(CATEGORY_TREE)],[t.subcatLabel,"subcategory",CATEGORY_TREE[form.category]?.subcats||[]],[t.typeLabel,"type",CATEGORY_TREE[form.category]?.types[form.subcategory]||[]]].map(([l,field,opts])=>(
                <div key={field}>
                  <label style={{display:"block",color:"#c4a56a",fontSize:".68rem",fontFamily:F,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{l}</label>
                  <select value={form[field]} onChange={e=>{const val=e.target.value;if(field==="category"){const sub=CATEGORY_TREE[val].subcats[0];const tp=CATEGORY_TREE[val].types[sub][0];setForm(f=>({...f,category:val,subcategory:sub,type:tp}));}else if(field==="subcategory"){const tp=CATEGORY_TREE[form.category].types[val][0];setForm(f=>({...f,subcategory:val,type:tp}));}else setForm(f=>({...f,[field]:val}));}} style={{width:"100%",background:"#faf7f2",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"9px 12px",borderRadius:8,fontFamily:F,fontSize:".85rem",cursor:"pointer"}}>
                    {opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:14}}>
              {[[t.nameLabel,"name","text"],[t.priceLabel,"price","number"],[t.origPrice,"originalPrice","number"],[t.saleDateLabel,"saleEndDate","datetime-local"]].map(([l,f,tp])=>(
                <div key={f}>
                  <label style={{display:"block",color:"#c4a56a",fontSize:".68rem",fontFamily:F,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{l}</label>
                  <input type={tp} value={form[f]||""} onChange={e=>setForm(ff=>({...ff,[f]:e.target.value}))} style={{width:"100%",background:"#faf7f2",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"9px 12px",borderRadius:8,fontFamily:f==="saleEndDate"?"DM Sans,sans-serif":F,fontSize:".85rem"}}/>
                </div>
              ))}
            </div>

            {/* IMAGE UPLOAD */}
            <div style={{marginBottom:14}}>
              <label style={{display:"block",color:"#c4a56a",fontSize:".68rem",fontFamily:F,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>{t.imgLabel} ({(form.imageUrls||[]).length}/5)</label>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-start"}}>
                {(form.imageUrls||[]).map((src,idx)=>(
                  <div key={idx} style={{position:"relative",width:90,height:90,borderRadius:10,overflow:"hidden",border:"1.5px solid #e5d9c8",flexShrink:0}}>
                    <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
                    <button onClick={()=>onRemoveImage(idx)} style={{position:"absolute",top:3,right:3,background:"rgba(192,57,43,.85)",border:"none",color:"#fff",borderRadius:"50%",width:20,height:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",fontWeight:700}}>✕</button>
                    {idx===0&&<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(58,32,6,.7)",color:"#d4af6a",fontSize:".55rem",fontFamily:F,textAlign:"center",padding:"2px 0",fontWeight:700}}>MAIN</div>}
                  </div>
                ))}
                {(form.imageUrls||[]).length<5&&(
                  <div onClick={()=>document.getElementById("admin-img-upload").click()}
                    style={{width:90,height:90,background:"#f5ede0",borderRadius:10,border:"2px dashed #d4b896",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"border-color .2s"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="#8B6914"} onMouseLeave={e=>e.currentTarget.style.borderColor="#d4b896"}>
                    <span style={{fontSize:"1.5rem",marginBottom:2}}>📷</span>
                    <span style={{fontFamily:F,fontSize:".58rem",color:"#b09070",textAlign:"center"}}>{t.uploadBtn}</span>
                  </div>
                )}
                <input id="admin-img-upload" type="file" accept="image/*" style={{display:"none"}} onChange={handleUpload}/>
                <div style={{flex:1,minWidth:160}}>
                  <div style={{fontFamily:F,fontSize:".72rem",color:"#8B6914",fontWeight:600,marginBottom:5}}>{t.urlPh}</div>
                  <input placeholder="https://i.imgur.com/..." onKeyDown={e=>{if(e.key==="Enter"&&e.target.value){onAddImage(e.target.value);e.target.value="";}}} style={{width:"100%",background:"#faf7f2",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"9px 12px",borderRadius:8,fontFamily:"monospace",fontSize:".78rem",direction:"ltr"}}/>
                  <div style={{fontFamily:F,fontSize:".68rem",color:"#ccc",marginTop:5}}>{isAr?"اضغط Enter لإضافة الرابط · أقصى 5 صور":t.pressEnter}</div>
                </div>
              </div>
            </div>

            <div style={{marginBottom:20}}>
              <label style={{display:"block",color:"#c4a56a",fontSize:".68rem",fontFamily:F,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{t.descLabel}</label>
              <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={2} style={{width:"100%",background:"#faf7f2",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"9px 12px",borderRadius:8,fontFamily:F,fontSize:".85rem",resize:"vertical"}}/>
            </div>

            {/* VARIANTS */}
            <div style={{background:"#faf7f2",borderRadius:12,padding:"18px 20px",border:"1px solid #e5d9c8"}}>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.05rem",fontWeight:600,color:"#2a1a06",marginBottom:14}}>{t.vmTitle}</div>
              <div style={{display:"flex",gap:10,alignItems:"flex-end",flexWrap:"wrap",marginBottom:16}}>
                <div style={{flex:1,minWidth:140}}>
                  <label style={{display:"block",color:"#c4a56a",fontSize:".65rem",fontFamily:F,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{t.szLabel}</label>
                  <select value={vForm.size} onChange={e=>setVForm(v=>({...v,size:e.target.value}))} style={{width:"100%",background:"#fff",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"9px 12px",borderRadius:8,fontFamily:F,fontSize:".85rem",cursor:"pointer"}}>
                    <option value="">{t.selSz}</option>
                    {sizePresets.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{flex:1,minWidth:120}}>
                  <label style={{display:"block",color:"#c4a56a",fontSize:".65rem",fontFamily:F,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{t.clrLabel}</label>
                  <input value={vForm.color} onChange={e=>setVForm(v=>({...v,color:e.target.value}))} placeholder="Black..." style={{width:"100%",background:"#fff",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"9px 12px",borderRadius:8,fontFamily:F,fontSize:".85rem"}}/>
                </div>
                <div style={{width:90}}>
                  <label style={{display:"block",color:"#c4a56a",fontSize:".65rem",fontFamily:F,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{t.stkLabel}</label>
                  <input type="number" min="0" value={vForm.stock} onChange={e=>setVForm(v=>({...v,stock:e.target.value}))} placeholder="0" style={{width:"100%",background:"#fff",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"9px 12px",borderRadius:8,fontFamily:F,fontSize:".85rem"}}/>
                </div>
                <button className="btn" onClick={onAddVar} style={{background:"#3a2006",color:"#fff",border:"none",padding:"9px 20px",borderRadius:8,cursor:"pointer",fontFamily:F,fontSize:".82rem",fontWeight:600,whiteSpace:"nowrap"}}>{t.addVar}</button>
              </div>
              {form.variants?.length>0
                ?<div style={{background:"#fff",borderRadius:10,overflow:"hidden",border:"1px solid #e5d9c8"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto"}}>
                    {[t.szLabel,t.clrLabel,t.stkLabel,""].map(h=><div key={h} style={{padding:"8px 14px",background:"#fdf9f4",fontFamily:F,fontSize:".68rem",color:"#c4a56a",fontWeight:600,textTransform:"uppercase",borderBottom:"1px solid #f0e8da"}}>{h}</div>)}
                    {form.variants.map((v,i)=>(
                      <div key={v.id} style={{display:"contents"}}>
                        <div style={{padding:"10px 14px",fontFamily:F,fontSize:".85rem",fontWeight:600,borderBottom:i<form.variants.length-1?"1px solid #faf5ef":"none"}}>{v.size}</div>
                        <div style={{padding:"10px 14px",fontFamily:F,fontSize:".85rem",borderBottom:i<form.variants.length-1?"1px solid #faf5ef":"none"}}>{v.color}</div>
                        <div style={{padding:"6px 14px",borderBottom:i<form.variants.length-1?"1px solid #faf5ef":"none",display:"flex",alignItems:"center"}}>
                          <input type="number" min="0" value={v.stock} onChange={e=>onUpdateVarStock(v.id,e.target.value)} style={{width:70,background:"#f5f0e8",border:"1.5px solid #e5d9c8",color:v.stock===0?"#c0392b":"#27ae60",padding:"5px 10px",borderRadius:6,fontFamily:"DM Sans,sans-serif",fontSize:".88rem",fontWeight:700,textAlign:"center"}}/>
                        </div>
                        <div style={{padding:"10px 14px",borderBottom:i<form.variants.length-1?"1px solid #faf5ef":"none",display:"flex",alignItems:"center"}}>
                          <button onClick={()=>onRemoveVar(v.id)} style={{background:"none",border:"none",color:"#e0a0a0",cursor:"pointer",fontSize:".9rem",padding:"4px 6px"}} onMouseEnter={e=>e.target.style.color="#c0392b"} onMouseLeave={e=>e.target.style.color="#e0a0a0"}>✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{padding:"10px 14px",background:"#fdf9f4",borderTop:"1px solid #f0e8da",fontFamily:F,fontSize:".78rem",color:"#8B6914",fontWeight:700}}>
                    {t.vmTotal}: {form.variants.reduce((s,v)=>s+Number(v.stock||0),0)} {t.vmPcs}
                  </div>
                </div>
                :<div style={{textAlign:"center",color:"#d4c4a8",fontFamily:F,fontSize:".82rem",padding:"16px"}}>{isAr?"أضف حجم ولون وكمية ↑":"Add size, color & qty ↑"}</div>
              }
            </div>
            <button className="btn" onClick={onSave} style={{marginTop:20,background:"#3a2006",color:"#fff",border:"none",padding:"12px 30px",borderRadius:30,cursor:"pointer",fontFamily:F,fontSize:".9rem",fontWeight:600}}>
              {editProd?t.saveBtn:t.addBtn}
            </button>
          </div>

          {/* Product list */}
          <div style={{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
            <div style={{padding:"14px 20px",borderBottom:"1px solid #f5ede0",background:"#faf7f2",fontFamily:F,fontSize:".72rem",color:"#c4a56a",letterSpacing:".08em"}}>{t.prodCount(products.length)}</div>
            {products.length===0&&<div style={{padding:"40px",textAlign:"center",color:"#d4c4a8",fontFamily:F}}>{isAr?"لا يوجد منتجات — أضف منتجك الأول ↑":"No products — add your first one ↑"}</div>}
            {products.map((p,i)=>{
              const stock=totalStock(p);
              return <div key={p.id} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 20px",borderBottom:i<products.length-1?"1px solid #faf5ef":"none",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="#fdf9f4"} onMouseLeave={e=>e.currentTarget.style.background=""}>
                <div style={{width:46,height:46,background:"#f5ede0",borderRadius:10,overflow:"hidden",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {firstImg(p)?<img src={firstImg(p)} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:"1.4rem"}}>{ICON[p.subcategory]||"👗"}</span>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1rem",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                  <div style={{color:"#c4a56a",fontSize:".72rem",fontFamily:F,marginTop:2}}>{p.subcategory} · {p.type} · {(p.variants||[]).length} {t.varsLabel}</div>
                </div>
                <div style={{color:"#8B6914",fontFamily:"DM Sans,sans-serif",fontWeight:700,minWidth:60,textAlign:"center"}}>{USD(p.price)}</div>
                <div style={{fontFamily:"DM Sans,sans-serif",fontWeight:700,fontSize:".9rem",minWidth:70,textAlign:"center",color:stock===0?"#c0392b":stock<=5?"#e67e22":"#27ae60"}}>{stock} {t.pcsLabel}</div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>onStartEdit(p)} style={{background:"#f0e4cc",border:"none",color:"#5a3e10",padding:"7px 14px",borderRadius:20,cursor:"pointer",fontSize:".78rem",fontFamily:F,fontWeight:600}}>{t.editBtn}</button>
                  <button onClick={()=>onDelete(p.id)} style={{background:"#fef2f2",border:"none",color:"#c0392b",padding:"7px 14px",borderRadius:20,cursor:"pointer",fontSize:".78rem",fontFamily:F,fontWeight:600}}>{t.delBtn}</button>
                </div>
              </div>;
            })}
          </div>
        </>
      )}

      {/* ORDERS */}
      {adminTab==="orders"&&(
        <div>
          {orders.length>0&&<button onClick={onExport} className="btn" style={{marginBottom:16,background:"#3a2006",color:"#fff",border:"none",padding:"10px 22px",borderRadius:30,cursor:"pointer",fontFamily:F,fontSize:".85rem",fontWeight:600}}>{t.exportOrders}</button>}
          <div style={{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
            {orders.length===0
              ?<div style={{padding:"60px",textAlign:"center",color:"#d4c4a8",fontFamily:"Cormorant Garamond,serif",fontSize:"1.3rem",fontStyle:"italic"}}>{t.noOrders}</div>
              :orders.map((o,i)=>(
                <div key={o.id} style={{padding:"18px 24px",borderBottom:i<orders.length-1?"1px solid #f5ede0":"none"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <span style={{fontFamily:"DM Sans,sans-serif",fontSize:".7rem",background:"#f0e4cc",color:"#7a5012",padding:"2px 8px",borderRadius:20,fontWeight:700}}>#{o.id}</span>
                      <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1rem",fontWeight:600}}>{o.name}</span>
                      <span style={{fontFamily:F,fontSize:".78rem",color:"#c4a56a"}}>{o.email}</span>
                    </div>
                    <div style={{display:"flex",gap:14,alignItems:"center"}}>
                      <span style={{fontFamily:F,fontSize:".78rem",color:"#d4c4a8"}}>{o.date}</span>
                      <span style={{fontFamily:"DM Sans,sans-serif",fontWeight:700,fontSize:"1rem",color:"#8B6914"}}>{USD(o.total)}</span>
                      {settings.whatsappNumber&&<a href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g,"")}?text=${encodeURIComponent(`Order #${o.id} — ${o.name}`)}`} target="_blank" rel="noreferrer" style={{background:"#25D366",color:"#fff",border:"none",padding:"5px 12px",borderRadius:20,cursor:"pointer",fontFamily:F,fontSize:".72rem",fontWeight:600,textDecoration:"none"}}>💬 WA</a>}
                    </div>
                  </div>
                  <div style={{fontFamily:F,fontSize:".78rem",color:"#bbb",marginBottom:8}}>{o.address1}, {o.city}, {o.state} {o.zip}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {o.items?.map(item=><span key={item.key} style={{background:"#f0e4cc",color:"#5a3e10",padding:"3px 10px",borderRadius:20,fontSize:".72rem",fontFamily:F,fontWeight:600}}>{item.name} ({item.variantSize}/{item.variantColor}) ×{item.qty}</span>)}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {adminTab==="settings"&&(
        <div style={{background:"#fff",borderRadius:16,padding:"28px",boxShadow:"0 2px 8px rgba(0,0,0,.04)",maxWidth:700}}>
          <h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"1.2rem",fontWeight:600,color:"#2a1a06",marginBottom:24,fontStyle:"italic"}}>{t.storeSettings}</h3>
          <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:20}}>
            {[[t.storeNameL,"storeName"],[t.taglineL,"storeTagline"],[t.heroTitleL,"heroTitle"],[t.heroSubL,"heroSub"],[t.waNumber,"whatsappNumber"],[t.adminPwL,"adminPassword"]].map(([l,f])=>(
              <div key={f}>
                <label style={{display:"block",color:"#c4a56a",fontSize:".68rem",fontFamily:F,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{l}</label>
                <input type={f==="adminPassword"?"password":"text"} value={sf[f]||""} onChange={e=>setSf(s=>({...s,[f]:e.target.value}))} placeholder={f==="whatsappNumber"?t.waNumberPh:""} style={{width:"100%",background:"#faf7f2",border:"1.5px solid #e5d9c8",color:"#1a1208",padding:"10px 13px",borderRadius:8,fontFamily:f==="whatsappNumber"?"monospace":F,fontSize:".88rem",direction:f==="whatsappNumber"||f==="paypalClientId"?"ltr":undefined}}/>
              </div>
            ))}
            <div style={{background:"#fff8f0",borderRadius:12,padding:"20px",border:"1.5px solid #e8c888"}}>
              <label style={{display:"block",color:"#8B6914",fontSize:".78rem",fontFamily:F,fontWeight:700,marginBottom:8}}>🔑 {t.ppClientId}</label>
              <input value={sf.paypalClientId||""} onChange={e=>setSf(s=>({...s,paypalClientId:e.target.value}))} placeholder="AaBbCcDd..." style={{width:"100%",background:"#fff",border:"1.5px solid #e8c888",color:"#1a1208",padding:"10px 13px",borderRadius:8,fontFamily:"monospace",fontSize:".82rem",direction:"ltr"}}/>
            </div>
          </div>
          <button className="btn" onClick={()=>{onSaveSettings(sf);toast(t.setOk);}} style={{background:"#3a2006",color:"#fff",border:"none",padding:"12px 30px",borderRadius:30,cursor:"pointer",fontFamily:F,fontSize:".9rem",fontWeight:600}}>{t.saveSet}</button>
        </div>
      )}
    </div>
  );
}