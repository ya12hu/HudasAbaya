import { useState, useEffect, useRef, useMemo } from "react";

// ─── Translations ────────────────────────────────────────────────
const T = {
  en: {
    store:"Store", admin:"Admin", langBtn:"عربي",
    collection:"Our Collection", subtitle:"MODEST · PREMIUM · SHIPPING ACROSS ALL 50 STATES",
    search:"Search products...", outOfStock:"Out of Stock", addToCart:"Add to Cart",
    soldOut:"Sold Out", addedToCart:"✓ Added", back:"← Back",
    shoppingBag:"Shopping Bag", emptyBag:"Your bag is empty",
    continueShopping:"Continue Shopping", subtotal:"Subtotal",
    shipping:"Shipping", freeShip:"Shipping calculated at checkout", total:"Total", checkout:"Checkout →",
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
    adminPanel:"Admin Panel", dashboard:"Dashboard", homepage:"Homepage", products:"Products", categories:"Categories", banners:"Banners", pricing:"Pricing & Discounts", shipping:"Shipping",
    orders:"Orders", customers:"Customers", analytics:"Analytics", marketing:"Marketing", content:"Content", media:"Media", seo:"SEO", settings:"Settings", language:"Language & Copy", sections:"Sections & Pages", access:"Admin Access", advanced:"Advanced Control", control:"Everything Control", navigation:"Navigation", checkoutSettings:"Checkout & Customer Experience", notifications:"Notifications & Emails", policies:"Policies & Legal", integrations:"Integrations & Tracking", localization:"Localization", logout:"Logout",
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
    exportCSV:"Export CSV", noOrders:"No orders yet", invoice:"Invoice", printInvoice:"Print / Save Invoice", shippingFee:"Shipping Fee", subtotalLabel:"Subtotal", taxLabel:"Tax",
    completeLook:"Complete the Look", completeLookSub:"You may also like this:",
    yesAdd:"Yes, add it", noThanks:"No thanks",
  },
  ar: {
    store:"المتجر", admin:"الإدارة", langBtn:"English",
    collection:"مجموعتنا", subtitle:"محتشم · فاخر · شحن إلى جميع الولايات الخمسين",
    search:"ابحثي عن منتج...", outOfStock:"نفذ المخزون", addToCart:"أضيفي للسلة",
    soldOut:"نفذ", addedToCart:"✓ تمت الإضافة", back:"→ رجوع",
    shoppingBag:"سلة التسوق", emptyBag:"سلتك فارغة",
    continueShopping:"تابعي التسوق", subtotal:"المجموع",
    shipping:"الشحن", freeShip:"يتم احتساب تكلفة الشحن عند إتمام الطلب", total:"الإجمالي", checkout:"إتمام الطلب ←",
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
    adminPanel:"لوحة التحكم", dashboard:"لوحة المعلومات", homepage:"الصفحة الرئيسية", products:"المنتجات", categories:"الفئات", banners:"البانرات", pricing:"التسعير والخصومات", shipping:"الشحن",
    orders:"الطلبات", customers:"العملاء", analytics:"التحليلات", marketing:"التسويق", content:"المحتوى", media:"الوسائط", seo:"SEO", settings:"الإعدادات", language:"اللغة والنصوص", sections:"الأقسام والصفحات", access:"صلاحيات الإدارة", advanced:"تحكم متقدم", control:"تحكم شامل", navigation:"التنقل والقوائم", checkoutSettings:"الدفع وتجربة العميل", notifications:"الإشعارات والبريد", policies:"السياسات والقانونيات", integrations:"التكاملات والتتبع", localization:"التوطين", logout:"خروج",
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
    exportCSV:"تصدير CSV", noOrders:"لا توجد طلبات بعد", invoice:"الفاتورة", printInvoice:"طباعة / حفظ الفاتورة", shippingFee:"رسوم الشحن", subtotalLabel:"المجموع الفرعي", taxLabel:"الضريبة",
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
  shippingPrice:8.99, freeShipOver:null, freeShippingEnabled:false, taxRate:0, adminPassword:"huda2024",
  shippingMethod:"Standard Shipping", shippingEtaMin:3, shippingEtaMax:7, handlingDays:1, trackingUrlTemplate:"",
  shippingZones:{
    "AL":8.99,"AK":14.99,"AZ":8.99,"AR":8.99,"CA":8.99,"CO":8.99,"CT":8.99,"DE":8.99,"FL":8.99,"GA":8.99,
    "HI":14.99,"ID":10.99,"IL":8.99,"IN":8.99,"IA":8.99,"KS":8.99,"KY":8.99,"LA":8.99,"ME":10.99,"MD":8.99,
    "MA":8.99,"MI":8.99,"MN":8.99,"MS":8.99,"MO":8.99,"MT":10.99,"NE":8.99,"NV":8.99,"NH":10.99,"NJ":8.99,
    "NM":10.99,"NY":8.99,"NC":8.99,"ND":10.99,"OH":8.99,"OK":8.99,"OR":10.99,"PA":8.99,"RI":10.99,"SC":8.99,
    "SD":10.99,"TN":8.99,"TX":8.99,"UT":10.99,"VT":10.99,"VA":8.99,"WA":10.99,"WV":8.99,"WI":8.99,"WY":10.99
  },
  couponCode:"", couponDiscount:0, couponActive:false,
  buyXQty:2, buyXDisc:10, buyXActive:false,
  categoryDiscounts:{ hijabMagnets:0, printedModal:0 },
  announcementText:"Welcome to Huda’s Abaya Boutique",
  heroTitle:"Huda’s Abaya Boutique",
  heroTitleAr:"بوتيك هدى للعبايات",
  heroSubtitle:"MODEST · PREMIUM · SHIPPING ACROSS ALL 50 STATES",
  heroSubtitleAr:"محتشم · فاخر · شحن إلى جميع الولايات الخمسين",
  heroButtonText:"Our Collection",
  heroButtonTextAr:"مجموعتنا",
  heroButtonLink:"#shop-grid",
  heroImages:[],
  heroInterval:2200,
  categories:[
    {id:"hijabMagnets",name:"Hijab Magnets",nameAr:"مغناطيسات الحجاب",active:true,order:1},
    {id:"printedModal",name:"Printed Modal Hijab",nameAr:"حجاب مودال مطبوع",active:true,order:2}
  ],
  banners:[],
  content:{about:"",contact:"",faq:"",privacy:"",terms:"",shippingPolicy:"",returnPolicy:""},
  appearance:{primaryColor:"#c4a56a",secondaryColor:"#1a1a1a",buttonRadius:8,productColumns:5},
  footer:{about:"",phone:"",email:"",address:"",copyright:""},
  heroKenBurns:true, announcementActive:true, defaultLanguage:"en", languageSwitcher:true, arabicRTL:true, maintenanceMode:false, storefrontPublished:true, allowGuestCheckout:true, showAdminShortcut:true, enableAuditLog:true, enableDraftPreview:true,
  wishlistEnabled:true, quickViewEnabled:true, recentlyViewedEnabled:true, backInStockEnabled:true, lowStockEnabled:true, reviewsEnabled:true, sizeGuideEnabled:true, compareEnabled:false,
  campaignActive:false, campaignTitle:"", campaignSubtitle:"", campaignButton:"Shop Now", campaignLink:"#shop-grid",
  stickyHeader:true, smoothScroll:true, productHoverZoom:true, showTrustBadges:true, showShippingEta:true,
  seoTitle:"Huda’s Abaya Boutique", seoDescription:"Premium modest fashion and abayas with shipping across all 50 U.S. states.", seoKeywords:"abaya, modest fashion, hijab, premium abaya", ogImage:"", canonicalUrl:"",
  reducedMotion:true, lazyImages:true, highContrast:false,
  // Full bilingual CMS: every editable UI label can be overridden from Admin
  translations:{en:{},ar:{}},
  homepageSections:[
    {id:"welcome",type:"text",title:"Welcome to Huda’s Abaya Boutique",titleAr:"مرحباً بكم في بوتيك هدى للعبايات",body:"Discover modest, premium pieces designed for effortless elegance.",bodyAr:"اكتشفي قطعاً محتشمة وفاخرة مصممة لأناقة سهلة.",image:"",buttonText:"Explore Collection",buttonTextAr:"استكشفي المجموعة",buttonLink:"#shop-grid",active:true,order:1},
    {id:"shipping-note",type:"feature",title:"Shipping Across All 50 States",titleAr:"الشحن إلى جميع الولايات الخمسين",body:"Shipping rates are calculated by destination. No free-shipping claim is shown unless enabled by the admin.",bodyAr:"يتم احتساب رسوم الشحن حسب الولاية. لا يظهر الشحن المجاني إلا إذا فعّله الأدمن.",image:"",buttonText:"View Shipping",buttonTextAr:"عرض الشحن",buttonLink:"#shop-grid",active:true,order:2}
  ],
  // Professional CMS control center: all customer-facing behavior, copy, layout and operational rules.
  siteMeta:{titleEn:"Huda’s Abaya Boutique",titleAr:"بوتيك هدى للعبايات",descriptionEn:"Premium modest fashion and abayas with shipping across all 50 U.S. states.",descriptionAr:"أزياء محتشمة وفاخرة مع الشحن إلى جميع الولايات الأمريكية الخمسين.",favicon:"",ogImage:"",canonical:""},
  navigation:{items:[{id:"home",labelEn:"Home",labelAr:"الرئيسية",href:"#top",active:true,order:1},{id:"collection",labelEn:"Collection",labelAr:"المجموعة",href:"#shop-grid",active:true,order:2},{id:"about",labelEn:"About",labelAr:"من نحن",href:"#about",active:true,order:3},{id:"contact",labelEn:"Contact",labelAr:"تواصل معنا",href:"#contact",active:true,order:4}]},
  checkout:{showOrderNotes:true,showPhone:true,requirePhone:false,showCompany:false,showAddress2:true,showCoupon:true,showTax:true,showShippingEstimate:true,paymentMethod:"PayPal",currency:"USD",currencySymbol:"$",termsRequired:false,termsTextEn:"I agree to the store terms.",termsTextAr:"أوافق على شروط المتجر.",successRedirect:"",thankYouMessageEn:"Thank you for your order!",thankYouMessageAr:"شكراً لطلبك!"},
  customerExperience:{showSearch:true,showWishlist:true,showQuickView:true,showRecentlyViewed:true,showReviews:true,showSizeGuide:true,showCompare:true,showRelatedProducts:true,showBreadcrumbs:true,showBackToTop:true,showCookieNotice:false,cookieTextEn:"We use cookies to improve your experience.",cookieTextAr:"نستخدم ملفات تعريف الارتباط لتحسين تجربتك.",popupEnabled:false,popupTitleEn:"",popupTitleAr:"",popupBodyEn:"",popupBodyAr:"",popupButtonEn:"Shop Now",popupButtonAr:"تسوقي الآن",popupLink:"#shop-grid",popupDelay:5},
  notifications:{orderConfirmation:true,shippingUpdate:true,deliveryUpdate:true,lowStock:true,backInStock:true,adminOrderAlert:true,adminEmail:"",whatsappAlerts:true,customerEmailFrom:"",customerSupportEmail:"",supportPhone:"",templates:{orderConfirmationEn:"Your order {{orderId}} has been received.",orderConfirmationAr:"تم استلام طلبك {{orderId}}.",shippingEn:"Your order {{orderId}} has shipped.",shippingAr:"تم شحن طلبك {{orderId}}.",deliveryEn:"Your order {{orderId}} was delivered.",deliveryAr:"تم تسليم طلبك {{orderId}}."}},
  policies:{privacyEn:"",privacyAr:"",termsEn:"",termsAr:"",shippingEn:"Shipping rates are calculated by destination across all 50 U.S. states.",shippingAr:"يتم احتساب رسوم الشحن حسب الولاية لجميع الولايات الأمريكية الخمسين.",returnsEn:"",returnsAr:"",refundsEn:"",refundsAr:"",sizeGuideEn:"",sizeGuideAr:"",accessibilityEn:"",accessibilityAr:""},
  integrations:{googleAnalyticsId:"",googleTagManagerId:"",metaPixelId:"",tiktokPixelId:"",facebookDomainVerification:"",googleSiteVerification:"",paypalClientId:"",stripePublicKey:"",mapsApiKey:"",mailchimpUrl:"",webhookUrl:"",whatsappNumber:"",instagramUrl:"",facebookUrl:"",tiktokUrl:"",snapchatUrl:""},
  localization:{defaultLanguage:"en",enabledLanguages:["en","ar"],arabicRTL:true,dateFormat:"MM/DD/YYYY",timeZone:"America/New_York",currency:"USD",currencySymbol:"$",decimalPlaces:2,thousandSeparator:",",decimalSeparator:".",stateLabelEn:"State",stateLabelAr:"الولاية",zipLabelEn:"ZIP Code",zipLabelAr:"الرمز البريدي"},
  storefront:{published:true,maintenance:false,passwordProtected:false,showAnnouncement:true,announcementTextEn:"",announcementTextAr:"",showPromoPopup:false,showSaleBadges:true,showStockBadges:true,showNewBadges:true,showDeliveryBadges:true,showTrustBadges:true,enableAnimations:true,enableProductZoom:true,enableStickyHeader:true,enableDarkMode:false,enableAccessibilityWidget:false},
  shippingRules:{methodEn:"Standard Shipping",methodAr:"الشحن القياسي",paidShippingOnly:true,freeShippingEnabled:false,freeShippingThreshold:null,etaMin:3,etaMax:7,handlingDays:1,cutoffHour:15,weekendProcessing:false,carrier:"",trackingTemplate:"",internationalShipping:false,poBoxAllowed:true,signatureRequired:false,insuranceEnabled:false},
  invoice:{enabled:true,includeShippingFee:true,includeTax:true,includeCustomerPhone:true,includeShippingAddress:true,storeName:"Huda’s Abaya Boutique",storeEmail:"",storePhone:"",footerEn:"Thank you for your order.",footerAr:"شكراً لطلبكم."},
  inventory:{lowStockThreshold:5,allowBackorders:false,showStockQuantity:false,hideOutOfStock:true,autoDisableOutOfStock:false,notifyAdminAtLowStock:true},
  marketing:{utmSource:"",utmMedium:"",utmCampaign:"",googleAdsId:"",metaAdsId:"",defaultCoupon:"",newsletterEnabled:false,newsletterTitleEn:"",newsletterTitleAr:"",newsletterTextEn:"",newsletterTextAr:"",newsletterButtonEn:"Subscribe",newsletterButtonAr:"اشتراك"},
  accessibility:{altTextRequired:false,keyboardFocus:true,reducedMotion:true,highContrast:false,largeText:false,screenReaderLabels:true},
  security:{sessionTimeoutMinutes:120,lockAfterFailedLogins:5,maintenanceLockMessageEn:"Store temporarily unavailable.",maintenanceLockMessageAr:"المتجر غير متاح مؤقتاً.",allowAdminShortcut:true,requireAdminPassword:true},
  customCopy:{en:{},ar:{}},
  adminRoles:[
    {id:"super-admin",name:"Super Admin",permissions:["*"]},
    {id:"catalog-manager",name:"Catalog Manager",permissions:["products","categories","media"]},
    {id:"orders-manager",name:"Orders Manager",permissions:["orders","customers","shipping"]},
    {id:"marketing-manager",name:"Marketing Manager",permissions:["homepage","banners","pricing","marketing","seo"]},
    {id:"content-manager",name:"Content & Language Manager",permissions:["content","language","homepage"]}
  ],
  adminAuditLog:[],
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
  const isRTL = lang==="ar";
  const [pageKey, setPageKey] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const [products, setProducts] = useState(()=>LS.get("huda_products", DEFAULT_PRODUCTS));
  const [settings, setSettings] = useState(()=>{ const saved=LS.get("huda_settings",{}); saved.freeShippingEnabled=false; if(saved.shippingRules) saved.shippingRules={...saved.shippingRules,freeShippingEnabled:false,freeShippingThreshold:null}; return { ...DEFAULT_SETTINGS, ...saved, categoryDiscounts:{...DEFAULT_SETTINGS.categoryDiscounts,...(saved.categoryDiscounts||{})}, appearance:{...DEFAULT_SETTINGS.appearance,...(saved.appearance||{})}, footer:{...DEFAULT_SETTINGS.footer,...(saved.footer||{})}, content:{...DEFAULT_SETTINGS.content,...(saved.content||{})}, shippingZones:{...DEFAULT_SETTINGS.shippingZones,...(saved.shippingZones||{})}, categories:saved.categories||DEFAULT_SETTINGS.categories, banners:saved.banners||DEFAULT_SETTINGS.banners, heroImages:saved.heroImages||DEFAULT_SETTINGS.heroImages, translations:{en:{...DEFAULT_SETTINGS.translations.en,...(saved.translations?.en||{})},ar:{...DEFAULT_SETTINGS.translations.ar,...(saved.translations?.ar||{})}}, siteMeta:{...DEFAULT_SETTINGS.siteMeta,...(saved.siteMeta||{})}, navigation:{...DEFAULT_SETTINGS.navigation,...(saved.navigation||{}),items:saved.navigation?.items||DEFAULT_SETTINGS.navigation.items}, checkout:{...DEFAULT_SETTINGS.checkout,...(saved.checkout||{})}, customerExperience:{...DEFAULT_SETTINGS.customerExperience,...(saved.customerExperience||{}),}, notifications:{...DEFAULT_SETTINGS.notifications,...(saved.notifications||{}),templates:{...DEFAULT_SETTINGS.notifications.templates,...(saved.notifications?.templates||{})}}, policies:{...DEFAULT_SETTINGS.policies,...(saved.policies||{})}, integrations:{...DEFAULT_SETTINGS.integrations,...(saved.integrations||{})}, localization:{...DEFAULT_SETTINGS.localization,...(saved.localization||{}),enabledLanguages:saved.localization?.enabledLanguages||DEFAULT_SETTINGS.localization.enabledLanguages}, storefront:{...DEFAULT_SETTINGS.storefront,...(saved.storefront||{})}, shippingRules:{...DEFAULT_SETTINGS.shippingRules,...(saved.shippingRules||{})}, invoice:{...DEFAULT_SETTINGS.invoice,...(saved.invoice||{})}, inventory:{...DEFAULT_SETTINGS.inventory,...(saved.inventory||{})}, marketing:{...DEFAULT_SETTINGS.marketing,...(saved.marketing||{})}, accessibility:{...DEFAULT_SETTINGS.accessibility,...(saved.accessibility||{})}, security:{...DEFAULT_SETTINGS.security,...(saved.security||{})}, customCopy:{en:{...(DEFAULT_SETTINGS.customCopy?.en||{}),...(saved.customCopy?.en||{})},ar:{...(DEFAULT_SETTINGS.customCopy?.ar||{}),...(saved.customCopy?.ar||{})}}, homepageSections:saved.homepageSections||DEFAULT_SETTINGS.homepageSections, adminRoles:saved.adminRoles||DEFAULT_SETTINGS.adminRoles, adminAuditLog:saved.adminAuditLog||[] }; });
  const t = useMemo(()=>({...T[lang], ...(settings?.translations?.[lang]||{})}),[lang,settings?.translations]);
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
  const US_STATES = [
    ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["FL","Florida"],["GA","Georgia"],
    ["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],
    ["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],
    ["NM","New Mexico"],["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],
    ["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],["VA","Virginia"],["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"]
  ];
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
  const heroImages = (settings.heroImages && settings.heroImages.length ? settings.heroImages : products.filter(p=>p.category==="printedModal").slice(0,4).map(p=>p.image));
  useEffect(()=>{
    if(heroImages.length===0 || page!=="shop" || !settings.heroInterval) return;
    const iv = setInterval(()=>setHeroImgIdx(i=>(i+1)%heroImages.length), Number(settings.heroInterval)||2200);
    return ()=>clearInterval(iv);
  },[heroImages.length, page]);
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
  const shippingCost = !settings.shippingMethod ? 0 : Number(settings.shippingZones?.[shippingForm.state] ?? settings.shippingPrice ?? 0);
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
  function updateSetting(field,val){ setSettings(s=>({...s,[field]:(field==="freeShippingEnabled"?false:val)})); }
  function updateCatDisc(cat,val){ setSettings(s=>({...s,categoryDiscounts:{...s.categoryDiscounts,[cat]:val}})); }
  function updateNestedSetting(group,field,val){ setSettings(s=>({...s,[group]:{...(s[group]||{}),[field]:(group==="shippingRules" && field==="freeShippingEnabled"?false:val)}})); }
  function updateTranslation(language,key,val){ setSettings(s=>({...s,translations:{...(s.translations||{}),[language]:{...((s.translations||{})[language]||{}),[key]:val}}})); }
  function addHomepageSection(){ const id="section-"+Date.now(); setSettings(s=>({...s,homepageSections:[...(s.homepageSections||[]),{id,type:"text",title:"New Section",titleAr:"قسم جديد",body:"",bodyAr:"",image:"",buttonText:"",buttonTextAr:"",buttonLink:"#shop-grid",active:true,order:(s.homepageSections||[]).length+1}]})); }
  function updateHomepageSection(id,field,val){ setSettings(s=>({...s,homepageSections:(s.homepageSections||[]).map(x=>x.id===id?{...x,[field]:val}:x)})); }
  function deleteHomepageSection(id){ setSettings(s=>({...s,homepageSections:(s.homepageSections||[]).filter(x=>x.id!==id)})); }
  function moveHomepageSection(id,direction){ setSettings(s=>{ const arr=[...(s.homepageSections||[])].sort((a,b)=>(a.order||0)-(b.order||0)); const i=arr.findIndex(x=>x.id===id); const j=direction==='up'?i-1:i+1; if(i<0||j<0||j>=arr.length) return s; [arr[i],arr[j]]=[arr[j],arr[i]]; return {...s,homepageSections:arr.map((x,idx)=>({...x,order:idx+1}))}; }); }
  function addAudit(action,details=""){ setSettings(s=>({...s,adminAuditLog:[{id:Date.now(),action,details,at:new Date().toISOString()},...(s.adminAuditLog||[])].slice(0,200)})); }
  function addBanner(){ setSettings(s=>({...s,banners:[...(s.banners||[]),{id:"ban-"+Date.now(),title:"New Banner",subtitle:"",image:"",buttonText:"Shop Now",buttonLink:"#shop-grid",active:true,order:(s.banners||[]).length+1}]})); }
  function updateBanner(id,field,val){ setSettings(s=>({...s,banners:(s.banners||[]).map(b=>b.id===id?{...b,[field]:val}:b)})); }
  function deleteBanner(id){ setSettings(s=>({...s,banners:(s.banners||[]).filter(b=>b.id!==id)})); }
  function addCategory(){ const id="cat-"+Date.now(); setSettings(s=>({...s,categories:[...(s.categories||[]),{id,name:"New Category",nameAr:"فئة جديدة",active:true,order:(s.categories||[]).length+1}]})); }
  function updateCategory(id,field,val){ setSettings(s=>({...s,categories:(s.categories||[]).map(c=>c.id===id?{...c,[field]:val}:c)})); }
  function deleteCategory(id){ setSettings(s=>({...s,categories:(s.categories||[]).filter(c=>c.id!==id)})); }
  function addHeroImage(){ setSettings(s=>({...s,heroImages:[...(s.heroImages||[]),""]})); }
  function updateHeroImage(i,val){ setSettings(s=>({...s,heroImages:(s.heroImages||[]).map((x,idx)=>idx===i?val:x)})); }
  function deleteHeroImage(i){ setSettings(s=>({...s,heroImages:(s.heroImages||[]).filter((_,idx)=>idx!==i)})); }
  function updateShippingZone(code,val){ setSettings(s=>({...s,shippingZones:{...(s.shippingZones||{}),[code]:Number(val)||0}})); }
  function resetCmsSettings(){ setSettings(s=>({...DEFAULT_SETTINGS,...s,siteMeta:{...DEFAULT_SETTINGS.siteMeta,...(s.siteMeta||{})},navigation:{...DEFAULT_SETTINGS.navigation,...(s.navigation||{}),items:s.navigation?.items||DEFAULT_SETTINGS.navigation.items},checkout:{...DEFAULT_SETTINGS.checkout,...(s.checkout||{})},customerExperience:{...DEFAULT_SETTINGS.customerExperience,...(s.customerExperience||{})},notifications:{...DEFAULT_SETTINGS.notifications,...(s.notifications||{}),templates:{...DEFAULT_SETTINGS.notifications.templates,...(s.notifications?.templates||{})}},policies:{...DEFAULT_SETTINGS.policies,...(s.policies||{})},integrations:{...DEFAULT_SETTINGS.integrations,...(s.integrations||{})},localization:{...DEFAULT_SETTINGS.localization,...(s.localization||{})},storefront:{...DEFAULT_SETTINGS.storefront,...(s.storefront||{})},shippingRules:{...DEFAULT_SETTINGS.shippingRules,...(s.shippingRules||{})},invoice:{...DEFAULT_SETTINGS.invoice,...(s.invoice||{})},inventory:{...DEFAULT_SETTINGS.inventory,...(s.inventory||{})},marketing:{...DEFAULT_SETTINGS.marketing,...(s.marketing||{})},accessibility:{...DEFAULT_SETTINGS.accessibility,...(s.accessibility||{})},security:{...DEFAULT_SETTINGS.security,...(s.security||{})},customCopy:{en:{...(DEFAULT_SETTINGS.customCopy.en||{}),...(s.customCopy?.en||{})},ar:{...(DEFAULT_SETTINGS.customCopy.ar||{}),...(s.customCopy?.ar||{})}},appearance:{...DEFAULT_SETTINGS.appearance,...(s.appearance||{})},footer:{...DEFAULT_SETTINGS.footer,...(s.footer||{})},content:{...DEFAULT_SETTINGS.content,...(s.content||{})},shippingZones:{...DEFAULT_SETTINGS.shippingZones,...(s.shippingZones||{})}})); }
  function updateCmsGroup(group,field,val){ setSettings(s=>({...s,[group]:{...(s[group]||{}),[field]:val}})); }
  function addCustomCopy(locale){ const id="copy-"+Date.now(); setSettings(s=>({...s,customCopy:{...(s.customCopy||{}),[locale]:{...(s.customCopy?.[locale]||{}),[id]:""}}})); }
  function deleteCustomCopy(locale,key){ setSettings(s=>({...s,customCopy:{...(s.customCopy||{}),[locale]:Object.fromEntries(Object.entries(s.customCopy?.[locale]||{}).filter(([k])=>k!==key))}})); }
  function addNavItem(){ const id="nav-"+Date.now(); setSettings(s=>({...s,navigation:{...(s.navigation||{}),items:[...(s.navigation?.items||[]),{id,labelEn:"New Link",labelAr:"رابط جديد",href:"#",active:true,order:(s.navigation?.items||[]).length+1}]}})); }
  function updateNavItem(id,field,val){ setSettings(s=>({...s,navigation:{...(s.navigation||{}),items:(s.navigation?.items||[]).map(x=>x.id===id?{...x,[field]:val}:x)}})); }
  function deleteNavItem(id){ setSettings(s=>({...s,navigation:{...(s.navigation||{}),items:(s.navigation?.items||[]).filter(x=>x.id!==id)}})); }
  function addLanguage(){ setSettings(s=>({...s,localization:{...(s.localization||{}),enabledLanguages:[...(s.localization?.enabledLanguages||[]),"new"]}})); }
  function removeLanguage(lang){ setSettings(s=>({...s,localization:{...(s.localization||{}),enabledLanguages:(s.localization?.enabledLanguages||[]).filter(x=>x!==lang)}})); }
  function exportData(){ const data={products,settings,orders,wishlist,exportedAt:new Date().toISOString()}; const a=document.createElement("a"); a.href="data:application/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(data,null,2)); a.download="huda-abaya-backup.json"; a.click(); }

  function placeOrder(ppDetails=null){
    const order = {
      id:"ORD-"+Date.now(),
      date:new Date().toLocaleDateString(),
      items:[...cart],
      shipping:{...shippingForm},
      subtotal:cartTotal.toFixed(2),
      shippingCost:shippingCost.toFixed(2),
      tax:tax.toFixed(2),
      total:orderTotal.toFixed(2),
      shippingMethod:settings.shippingMethod||"Standard Shipping",
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

  function printInvoice(order){
    if(!order || settings.invoice?.enabled===false) return;
    const inv = settings.invoice || {};
    const ar = lang === "ar";
    const esc = (v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
    const itemRows = (order.items||[]).map(item=>{
      const product = products.find(p=>p.id===item.id) || item;
      const qty = Number(item.qty||1);
      const unit = Number(calcPrice(product,settings,qty)||0);
      return `<tr><td>${esc(lang==="ar"?(product.nameAr||product.name):product.name)}</td><td>${qty}</td><td>$${unit.toFixed(2)}</td><td>$${(unit*qty).toFixed(2)}</td></tr>`;
    }).join("");
    const shippingFee = Number(order.shippingCost ?? shippingCost ?? 0);
    const taxAmount = Number(order.tax ?? 0);
    const subtotal = Number(order.subtotal ?? 0);
    const total = Number(order.total ?? 0);
    const address = [order.shipping?.addr1,order.shipping?.addr2,order.shipping?.city,order.shipping?.state,order.shipping?.zip].filter(Boolean).join(", ");
    const title = ar ? "الفاتورة" : "INVOICE";
    const labels = ar ? {date:"التاريخ",order:"رقم الطلب",customer:"العميل",address:"عنوان الشحن",items:"المنتجات",qty:"الكمية",unit:"السعر",amount:"المبلغ",subtotal:"المجموع الفرعي",shipping:"رسوم الشحن",tax:"الضريبة",total:"الإجمالي"} : {date:"Date",order:"Order ID",customer:"Customer",address:"Shipping Address",items:"Items",qty:"Qty",unit:"Unit Price",amount:"Amount",subtotal:"Subtotal",shipping:"Shipping Fee",tax:"Tax",total:"Total"};
    const footer = ar ? (inv.footerAr||"شكراً لطلبكم.") : (inv.footerEn||"Thank you for your order.");
    const html=`<!doctype html><html lang="${ar?'ar':'en'}" dir="${ar?'rtl':'ltr'}"><head><meta charset="utf-8"><title>${title} - ${esc(order.id)}</title><style>body{font-family:Arial,sans-serif;margin:0;background:#f5f2ec;color:#222}.invoice{max-width:820px;margin:30px auto;background:#fff;padding:42px;box-shadow:0 8px 30px rgba(0,0,0,.08)}.top{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #ddd;padding-bottom:22px}.brand{font-size:25px;font-weight:700}.muted{color:#777;font-size:13px;line-height:1.7}h1{font-size:30px;margin:0}.meta{margin:24px 0;display:grid;grid-template-columns:1fr 1fr;gap:20px}.box{background:#faf8f4;padding:15px;border-radius:10px}.label{font-size:11px;color:#888;text-transform:uppercase;margin-bottom:5px}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{padding:11px 8px;border-bottom:1px solid #eee;text-align:${ar?'right':'left'};font-size:13px}th{color:#777;font-weight:600}.totals{margin-top:20px;margin-${ar?'left':'right'}:0;width:300px;max-width:100%}.row{display:flex;justify-content:space-between;padding:7px 0}.grand{font-weight:700;font-size:18px;border-top:2px solid #222;margin-top:7px;padding-top:12px}.footer{margin-top:35px;padding-top:20px;border-top:1px solid #ddd;text-align:center;color:#777;font-size:13px}@media print{body{background:#fff}.invoice{margin:0;box-shadow:none;max-width:none}button{display:none}}</style></head><body><div class="invoice"><div class="top"><div><div class="brand">${esc(inv.storeName||settings.storeName||"Huda’s Abaya Boutique")}</div><div class="muted">${esc(inv.storeEmail||settings.email||"")} ${inv.storePhone?" · "+esc(inv.storePhone):""}</div></div><div style="text-align:${ar?'left':'right'}"><h1>${title}</h1><div class="muted">${labels.order}: ${esc(order.id)}<br>${labels.date}: ${esc(order.date)}</div></div></div><div class="meta"><div class="box"><div class="label">${labels.customer}</div><strong>${esc(order.shipping?.name||"")}</strong><div class="muted">${esc(order.shipping?.email||"")}${inv.includeCustomerPhone&&order.shipping?.phone?"<br>"+esc(order.shipping.phone):""}</div></div>${inv.includeShippingAddress?`<div class="box"><div class="label">${labels.address}</div><div class="muted">${esc(address)}</div></div>`:""}</div><table><thead><tr><th>${labels.items}</th><th>${labels.qty}</th><th>${labels.unit}</th><th>${labels.amount}</th></tr></thead><tbody>${itemRows}</tbody></table><div class="totals"><div class="row"><span>${labels.subtotal}</span><span>$${subtotal.toFixed(2)}</span></div><div class="row"><span>${labels.shipping}</span><span>$${inv.includeShippingFee!==false?shippingFee.toFixed(2):"0.00"}</span></div>${inv.includeTax?`<div class="row"><span>${labels.tax}</span><span>$${taxAmount.toFixed(2)}</span></div>`:""}<div class="row grand"><span>${labels.total}</span><span>$${total.toFixed(2)}</span></div></div><div class="footer">${esc(footer)}</div><button onclick="window.print()" style="margin-top:25px;padding:10px 18px;border:0;border-radius:8px;background:#222;color:#fff">${ar?'طباعة':'Print'}</button></div></body></html>`;
    const w=window.open("","_blank","width=900,height=800");
    if(w){w.document.write(html);w.document.close();setTimeout(()=>w.focus(),100);}
  }

  function exportCSV(){
    const rows=[["Order ID","Date","Name","City","State","Subtotal","Shipping Fee","Tax","Total","Status"],...orders.map(o=>[o.id,o.date,o.shipping?.name,o.shipping?.city,o.shipping?.state,o.subtotal||"",o.shippingCost||"0.00",o.tax||"0.00",o.total,o.status])];
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
            <img key={img} src={img} alt="" loading={i===0?"eager":"lazy"} decoding="async" style={{...styles.heroBg, ...(i===heroImgIdx?styles.heroBgActive:{}), ...(settings.heroKenBurns!==false && i===heroImgIdx ? {transform:"scale(1.06)"}:{})}} />
          ))}
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroContent}>
            <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,6vw,3.2rem)", fontWeight:700, letterSpacing:".05em", color:"#c4a56a", marginBottom:32, textShadow:"0 4px 20px rgba(0,0,0,.5)", whiteSpace:"nowrap"}}>
              {lang==="ar" ? (settings.heroTitleAr || settings.heroTitle) : settings.heroTitle}
            </div>
            {settings.heroSubtitle && <div style={{color:"#fff",fontSize:".72rem",letterSpacing:".18em",marginBottom:18,textShadow:"0 2px 10px rgba(0,0,0,.5)"}}>{lang==="ar" ? (settings.heroSubtitleAr || settings.heroSubtitle) : settings.heroSubtitle}</div>}
            <button style={styles.shopBtn} onClick={()=>{ const link=settings.heroButtonLink||"#shop-grid"; if(link.startsWith("#")) document.getElementById(link.slice(1))?.scrollIntoView({behavior:"smooth"}); else window.location.href=link; }}>{lang==="ar" ? (settings.heroButtonTextAr || settings.heroButtonText) : (settings.heroButtonText || t.collection)}</button>
          </div>
        </div>
        {/* Filter Bar */}
        <div style={styles.filterBar}>
          <input style={styles.searchInput} placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)} />
          {[{id:"all",name:t.allCategories,nameAr:t.allCategories},...(settings.categories||[]).filter(c=>c.active!==false).sort((a,b)=>(a.order||0)-(b.order||0))].map(cat=>(
            <button key={cat.id} style={{...styles.filterBtn,...(categoryFilter===cat.id?styles.filterBtnActive:{})}}
              onClick={()=>setCategoryFilter(cat.id)}>
              {cat.id==="all" ? cat.name : (lang==="ar" ? cat.nameAr : cat.name)}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div id="shop-grid" style={{...styles.grid, gridTemplateColumns:`repeat(${gridCols},1fr)`}}>
          {visibleProducts.length===0
            ? <div style={{gridColumn:"1/-1",textAlign:"center",padding:60,color:"#999"}}>{t.noResults}</div>
            : visibleProducts.map(p=><ProductCard key={p.id} p={p}/>)}
        </div>
        {(settings.homepageSections||[]).filter(s=>s.active!==false).sort((a,b)=>(a.order||0)-(b.order||0)).map(sec=><section key={sec.id} style={{padding:"55px 22px",background:sec.order%2===0?"#fbfaf7":"#fff",textAlign:"center"}}>
          {sec.image && <img src={sec.image} alt={lang==='ar'?sec.titleAr:sec.title} onError={onImgErr} loading="lazy" style={{width:"100%",maxWidth:900,maxHeight:420,objectFit:"cover",borderRadius:16,margin:"0 auto 24px",display:"block"}}/>}
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.6rem,4vw,2.5rem)",marginBottom:10}}>{lang==='ar'?sec.titleAr:sec.title}</h2>
          {(lang==='ar'?sec.bodyAr:sec.body) && <p style={{maxWidth:720,margin:"0 auto 20px",color:"#666",lineHeight:1.8}}>{lang==='ar'?sec.bodyAr:sec.body}</p>}
          {(lang==='ar'?sec.buttonTextAr:sec.buttonText) && <button style={styles.shopBtn} onClick={()=>{const link=sec.buttonLink||'#shop-grid'; if(link.startsWith('#')) document.getElementById(link.slice(1))?.scrollIntoView({behavior:'smooth'}); else window.location.href=link;}}>{lang==='ar'?sec.buttonTextAr:sec.buttonText}</button>}
        </section>
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
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span>{t.shipping}</span><span>{`$${shippingCost.toFixed(2)}`}</span></div>
              {shippingForm.state && <div style={{fontSize:".72rem",color:"#777",marginBottom:8}}>Estimated delivery: {settings.shippingEtaMin||3}-{settings.shippingEtaMax||7} business days to {shippingForm.state}</div>}
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
    function validate(){ return sf.name&&sf.email&&sf.addr1&&sf.city&&sf.state&&sf.zip; }
    return (
      <div style={styles.checkoutWrap}>
        <button style={{...styles.navBtn,padding:"16px 0"}} onClick={()=>setPage("cart")}>← {t.back}</button>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",marginBottom:20}}>{t.shippingInfo}</h2>
        {[["name",t.fullName],["email",t.email],["phone",t.phone],["addr1",t.addr1],["addr2",t.addr2],["city",t.city]].map(([k,label])=>(
          <input key={k} style={styles.input} placeholder={label} value={sf[k]} onChange={e=>setSF(k,e.target.value)} />
        ))}
        <select style={styles.input} value={sf.state} onChange={e=>setSF("state",e.target.value)}>
          <option value="">{t.state}</option>
          {US_STATES.map(([code,name])=><option key={code} value={code}>{name}</option>)}
        </select>
        <input style={styles.input} placeholder={t.zip} value={sf.zip} onChange={e=>setSF("zip",e.target.value)} />
        <div style={{background:"#f7f3eb",border:"1px solid #e8ddc9",borderRadius:10,padding:12,marginBottom:14,fontSize:".8rem",color:"#5f574b"}}>
          <strong>{settings.shippingMethod||"Standard Shipping"}</strong> · {settings.shippingEtaMin||3}-{settings.shippingEtaMax||7} business days · Shipping available across all 50 U.S. states.
        </div>
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
        {o && settings.invoice?.enabled!==false && <button style={{...styles.shopBtn,marginTop:12,background:"#fff",color:"#222",border:"1px solid #ddd"}} onClick={()=>printInvoice(o)}>{t.printInvoice}</button>}
        <button style={{...styles.shopBtn,marginTop:12}} onClick={()=>setPage("shop")}>{t.continueShopping}</button>
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
          <AdminPasswordInput styles={styles} placeholder={t.passwordLabel} onSubmit={(val,isBlur)=>{setAdminPass(val);if(isBlur)return;if(val===settings.adminPassword){setAdminLoggedIn(true);setAdminPassErr(false);}else setAdminPassErr(true);}} />
          {adminPassErr && <div style={{color:"#e53935",fontSize:".85rem",marginBottom:8}}>{t.wrongPass}</div>}
          <button style={styles.checkoutBtn} onClick={()=>{if(adminPass===settings.adminPassword){setAdminLoggedIn(true);setAdminPassErr(false);}else setAdminPassErr(true);}}>{t.login}</button>
        </div>
      );
    }
    const tabs=["dashboard","homepage","sections","products","categories","banners","pricing","shipping","orders","customers","analytics","marketing","content","language","media","seo","navigation","checkoutSettings","notifications","policies","integrations","localization","access","control","advanced","settings"];
    const activeProducts=products.filter(p=>p.active).length;
    const revenue=orders.reduce((sum,o)=>sum+(parseFloat(o.total)||0),0);
    const customers=[...new Map(orders.map(o=>[o.shipping?.email||o.shipping?.phone||o.shipping?.name||o.id,o.shipping||{}])).values()];
    const saveField=(key)=>saveAdmin(key);
    return (
      <div style={styles.adminWrap}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,gap:10}}>
          <div><h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem"}}>{t.adminPanel}</h2><div style={{fontSize:".75rem",color:"#888"}}>Full CMS control</div></div>
          <div style={{display:"flex",gap:8}}><button style={{...styles.saveBtn,background:"#1a1a1a"}} onClick={exportData}>Export Backup</button><button style={{...styles.navBtn,color:"#e53935"}} onClick={()=>setAdminLoggedIn(false)}>{t.logout}</button></div>
        </div>
        <div style={{...styles.adminTabs,overflowX:"auto",flexWrap:"nowrap"}}>
          {tabs.map(tab=><button key={tab} style={{...styles.adminTab,...(adminTab===tab?styles.adminTabActive:{})}} onClick={()=>setAdminTab(tab)}>{t[tab]}</button>)}
        </div>

        {adminTab==="dashboard" && <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12}}>
          {[["Products",products.length],["Active Products",activeProducts],["Orders",orders.length],["Customers",customers.length],["Revenue",`$${revenue.toFixed(2)}`],["Out of Stock",products.filter(p=>(p.stock??99)<=0).length]].map(([label,value])=><div key={label} style={styles.pricingCard}><div style={{fontSize:".78rem",color:"#888"}}>{label}</div><div style={{fontSize:"1.8rem",fontWeight:700,marginTop:8}}>{value}</div></div>)}
          <div style={{...styles.pricingCard,gridColumn:"1/-1"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
              <div><h3 style={{marginBottom:4}}>Store Command Center</h3><p style={{color:"#777",fontSize:".82rem",margin:0}}>Live operational view based on your current store data.</p></div>
              <span style={{fontSize:".72rem",padding:"6px 10px",borderRadius:99,background:"#eef8f0",color:"#2e7d32",fontWeight:700}}>● SYSTEM READY</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:10,marginTop:16}}>
              {[
                ["Catalog Health",products.length?Math.round(activeProducts/products.length*100):0,"% active"],
                ["Shipping Coverage",50,"US states"],
                ["Inventory Health",products.length?Math.round(products.filter(p=>(p.stock??99)>0).length/products.length*100):0,"% in stock"],
                ["Order Fulfillment",orders.length?Math.round(orders.filter(o=>["delivered","shipped"].includes(o.status)).length/orders.length*100):0,"% shipped/delivered"]
              ].map(([label,val,suffix])=><div key={label} style={{padding:12,border:"1px solid #eee",borderRadius:10,background:"#fcfbf9"}}><div style={{fontSize:".72rem",color:"#888"}}>{label}</div><div style={{fontSize:"1.35rem",fontWeight:700,marginTop:5}}>{val}{suffix}</div><div style={{height:5,background:"#eee",borderRadius:99,marginTop:8,overflow:"hidden"}}><div style={{width:`${Math.min(100,Number(val))}%`,height:"100%",background:"#c4a56a"}}/></div></div>)}
            </div>
          </div>
        </div>}

        {adminTab==="homepage" && <div>
          <div style={styles.pricingCard}>
            <h3 style={{marginBottom:16}}>Hero / Homepage</h3>
            {[['heroTitle','Hero Title'],['heroTitleAr','Hero Title Arabic'],['heroSubtitle','Hero Subtitle'],['heroSubtitleAr','Hero Subtitle Arabic'],['heroButtonText','Button Text'],['heroButtonTextAr','Button Text Arabic'],['heroButtonLink','Button Link'],['announcementText','Announcement Bar']].map(([k,label])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{label}</span><input style={{...styles.adminInput,width:"min(100%,430px)"}} value={settings[k]||""} onChange={e=>updateSetting(k,e.target.value)}/></div>)}
            <div style={styles.pricingRow}><span style={styles.pricingLabel}>Hero Interval (ms)</span><input type="number" style={styles.adminInput} value={settings.heroInterval||2200} min={500} onChange={e=>updateSetting("heroInterval",parseInt(e.target.value)||2200)}/></div>
            <div style={styles.pricingRow}><span style={styles.pricingLabel}>Hero Ken Burns Effect</span><Toggle on={settings.heroKenBurns!==false} onToggle={()=>updateSetting("heroKenBurns",settings.heroKenBurns===false)}/></div>
            <div style={styles.pricingRow}><span style={styles.pricingLabel}>Announcement Bar</span><Toggle on={settings.announcementActive!==false} onToggle={()=>updateSetting("announcementActive",settings.announcementActive===false)}/></div>
            <button style={styles.saveBtn} onClick={()=>saveField("homepage")}>{savedMsg.homepage?t.saved:t.save}</button>
          </div>
          <div style={styles.pricingCard}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h3>Hero Images</h3><button style={styles.saveBtn} onClick={addHeroImage}>+ Add Image</button></div>
            {(settings.heroImages||[]).map((img,i)=><div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}><input style={{...styles.adminInput,flex:1}} placeholder="Image URL" value={img} onChange={e=>updateHeroImage(i,e.target.value)}/>{img&&<img src={img} onError={onImgErr} alt="" style={{width:52,height:52,objectFit:"cover",borderRadius:6}}/>}<button style={{...styles.navBtn,color:"#e53935"}} onClick={()=>deleteHeroImage(i)}>Delete</button></div>)}
            <div style={{fontSize:".75rem",color:"#888"}}>If no custom hero images are added, the current product-based hero images remain as fallback.</div>
          </div>
          <div style={styles.pricingCard}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div><h3>Homepage Sections</h3><p style={{color:"#777",fontSize:".78rem",margin:0}}>Build the homepage like a visual CMS. Every section supports English and Arabic content.</p></div><button style={styles.saveBtn} onClick={addHomepageSection}>+ Add Section</button></div>
            {(settings.homepageSections||[]).sort((a,b)=>(a.order||0)-(b.order||0)).map((sec,i)=><div key={sec.id} style={{border:"1px solid #eee",borderRadius:12,padding:14,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,marginBottom:10}}><strong>#{i+1} · {sec.id}</strong><div style={{display:"flex",gap:6}}><button style={styles.navBtn} onClick={()=>moveHomepageSection(sec.id,'up')}>↑</button><button style={styles.navBtn} onClick={()=>moveHomepageSection(sec.id,'down')}>↓</button><Toggle on={sec.active!==false} onToggle={()=>updateHomepageSection(sec.id,'active',sec.active===false)}/><button style={{...styles.navBtn,color:"#e53935"}} onClick={()=>deleteHomepageSection(sec.id)}>Delete</button></div></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[["title","English Title"],["titleAr","Arabic Title"],["body","English Body"],["bodyAr","Arabic Body"],["image","Image URL"],["buttonText","English Button"],["buttonTextAr","Arabic Button"],["buttonLink","Button Link"]].map(([k,l])=><div key={k}><label style={{display:"block",fontSize:".72rem",fontWeight:700,marginBottom:4}}>{l}</label>{k.includes('body')?<textarea style={{...styles.adminInput,width:"100%",minHeight:70}} value={sec[k]||""} onChange={e=>updateHomepageSection(sec.id,k,e.target.value)}/>:<input style={{...styles.adminInput,width:"100%"}} value={sec[k]||""} onChange={e=>updateHomepageSection(sec.id,k,e.target.value)}/>}</div>)}
              </div>
            </div>)}
            <button style={styles.saveBtn} onClick={()=>{saveField('homepageSections');addAudit('Updated homepage sections','Homepage visual CMS content');}}>{savedMsg.homepageSections?t.saved:t.save}</button>
          </div>
        </div>}

        {adminTab==="products" && <div style={{overflowX:"auto"}}><table style={styles.table}><thead><tr>{["Image",t.productName,"Arabic Name",t.price,t.discount,"Stock","Category","New Arrival","Featured","Best Seller",t.active].map(h=><th key={h} style={styles.th}>{h}</th>)}</tr></thead><tbody>{products.map(p=><tr key={p.id}>
          <td style={styles.td}><img src={p.image} style={{width:50,height:65,objectFit:"cover",borderRadius:6}} alt="" loading="lazy" onError={onImgErr}/><input style={{...styles.adminInput,width:180,marginTop:5}} value={p.image||""} onChange={e=>updateProduct(p.id,"image",e.target.value)}/></td>
          <td style={styles.td}><input style={{...styles.adminInput,width:160}} value={p.name||""} onChange={e=>updateProduct(p.id,"name",e.target.value)}/></td>
          <td style={styles.td}><input style={{...styles.adminInput,width:160}} value={p.nameAr||""} onChange={e=>updateProduct(p.id,"nameAr",e.target.value)}/></td>
          <td style={styles.td}><input type="number" style={styles.adminInput} value={p.price??0} min={0} step=".01" onChange={e=>updateProduct(p.id,"price",parseFloat(e.target.value)||0)}/></td>
          <td style={styles.td}><input type="number" style={styles.adminInput} value={p.discount??0} min={0} max={100} onChange={e=>updateProduct(p.id,"discount",parseFloat(e.target.value)||0)}/></td>
          <td style={styles.td}><input type="number" style={styles.adminInput} value={p.stock??0} min={0} onChange={e=>updateProduct(p.id,"stock",parseInt(e.target.value)||0)}/></td>
          <td style={styles.td}><select style={styles.adminInput} value={p.category||""} onChange={e=>updateProduct(p.id,"category",e.target.value)}>{(settings.categories||[]).map(c=><option key={c.id} value={c.id}>{lang==="ar"?c.nameAr:c.name}</option>)}</select></td>
          <td style={styles.td}><Toggle on={!!p.newArrival} onToggle={()=>updateProduct(p.id,"newArrival",!p.newArrival)}/></td><td style={styles.td}><Toggle on={!!p.featured} onToggle={()=>updateProduct(p.id,"featured",!p.featured)}/></td><td style={styles.td}><Toggle on={!!p.bestSeller} onToggle={()=>updateProduct(p.id,"bestSeller",!p.bestSeller)}/></td><td style={styles.td}><Toggle on={!!p.active} onToggle={()=>updateProduct(p.id,"active",!p.active)}/></td>
        </tr>)}</tbody></table></div>}

        {adminTab==="categories" && <div><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><h3>Categories</h3><button style={styles.saveBtn} onClick={addCategory}>+ Add Category</button></div>{(settings.categories||[]).map(c=><div key={c.id} style={{...styles.pricingCard,display:"grid",gridTemplateColumns:"1fr 1fr 80px auto",gap:10,alignItems:"center"}}><input style={styles.adminInput} value={c.name||""} onChange={e=>updateCategory(c.id,"name",e.target.value)} placeholder="English name"/><input style={styles.adminInput} value={c.nameAr||""} onChange={e=>updateCategory(c.id,"nameAr",e.target.value)} placeholder="Arabic name"/><input type="number" style={styles.adminInput} value={c.order||0} onChange={e=>updateCategory(c.id,"order",parseInt(e.target.value)||0)}/><div style={{display:"flex",gap:6}}><Toggle on={c.active!==false} onToggle={()=>updateCategory(c.id,"active",c.active===false)}/><button style={{...styles.navBtn,color:"#e53935"}} onClick={()=>deleteCategory(c.id)}>Delete</button></div></div>)}</div>}

        {adminTab==="banners" && <div><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><h3>Promotional Banners</h3><button style={styles.saveBtn} onClick={addBanner}>+ Add Banner</button></div>{(settings.banners||[]).map(b=><div key={b.id} style={styles.pricingCard}>{[["title","Title"],["subtitle","Subtitle"],["image","Image URL"],["buttonText","Button Text"],["buttonLink","Button Link"]].map(([k,l])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{l}</span><input style={{...styles.adminInput,width:"min(100%,420px)"}} value={b[k]||""} onChange={e=>updateBanner(b.id,k,e.target.value)}/></div>)}<div style={{display:"flex",gap:12,alignItems:"center"}}><Toggle on={b.active!==false} onToggle={()=>updateBanner(b.id,"active",b.active===false)}/><input type="number" style={styles.adminInput} value={b.order||0} onChange={e=>updateBanner(b.id,"order",parseInt(e.target.value)||0)}/><button style={{...styles.navBtn,color:"#e53935"}} onClick={()=>deleteBanner(b.id)}>Delete Banner</button></div></div>)}</div>}

        {adminTab==="pricing" && <div>
          <div style={styles.pricingCard}><h3 style={{marginBottom:16}}>Category Discounts</h3>{(settings.categories||[]).map(cat=><div key={cat.id} style={styles.pricingRow}><span style={styles.pricingLabel}>{lang==="ar"?cat.nameAr:cat.name}</span><input type="number" style={styles.adminInput} min={0} max={100} value={settings.categoryDiscounts?.[cat.id]||0} onChange={e=>updateCatDisc(cat.id,parseFloat(e.target.value)||0)}/><span>%</span></div>)}</div>
          <div style={styles.pricingCard}><h3>{t.couponCode}</h3><div style={styles.pricingRow}><span style={styles.pricingLabel}>{t.couponCode}</span><input style={styles.adminInput} value={settings.couponCode||""} onChange={e=>updateSetting("couponCode",e.target.value)}/></div><div style={styles.pricingRow}><span style={styles.pricingLabel}>{t.couponDiscount}</span><input type="number" style={styles.adminInput} value={settings.couponDiscount||0} onChange={e=>updateSetting("couponDiscount",parseFloat(e.target.value)||0)}/><span>%</span><Toggle on={!!settings.couponActive} onToggle={()=>updateSetting("couponActive",!settings.couponActive)}/></div></div>
          <div style={styles.pricingCard}><h3>{t.buyX}</h3><div style={styles.pricingRow}><span style={styles.pricingLabel}>{t.buyXQty}</span><input type="number" style={styles.adminInput} value={settings.buyXQty||2} onChange={e=>updateSetting("buyXQty",parseInt(e.target.value)||2)}/></div><div style={styles.pricingRow}><span style={styles.pricingLabel}>{t.buyXDisc}</span><input type="number" style={styles.adminInput} value={settings.buyXDisc||0} onChange={e=>updateSetting("buyXDisc",parseFloat(e.target.value)||0)}/><span>%</span><Toggle on={!!settings.buyXActive} onToggle={()=>updateSetting("buyXActive",!settings.buyXActive)}/></div></div>
          <div style={styles.pricingCard}><h3>{t.shipping}</h3><div style={{color:"#777",fontSize:".8rem",marginBottom:10}}>Shipping prices and all 50 state rates are managed in the Shipping tab.</div><div style={styles.pricingRow}><span style={styles.pricingLabel}>{t.shipping_price}</span><input type="number" style={styles.adminInput} value={settings.shippingPrice||0} onChange={e=>updateSetting("shippingPrice",parseFloat(e.target.value)||0)}/></div><div style={styles.pricingRow}><span style={styles.pricingLabel}>{t.taxRate}</span><input type="number" style={styles.adminInput} value={settings.taxRate||0} onChange={e=>updateSetting("taxRate",parseFloat(e.target.value)||0)}/><span>%</span></div></div>
        </div>}

        {adminTab==="shipping" && <div>
          <div style={styles.pricingCard}>
            <h3 style={{marginBottom:8}}>Shipping Command Center</h3>
            <p style={{color:"#777",fontSize:".82rem",lineHeight:1.5}}>Shipping is available across all 50 U.S. states and is paid by the customer. Set the exact shipping price for every state and manage delivery expectations.</p>
            <div style={{marginTop:16,padding:14,border:"1px solid #e7e0d5",borderRadius:10,background:"#fbfaf7"}}><strong>Invoice & Shipping Fee</strong><p style={{color:"#777",fontSize:".78rem",lineHeight:1.5,margin:"6px 0 10px"}}>The shipping fee selected for the customer’s state is automatically stored on the order and included on the invoice.</p><div style={styles.pricingRow}><span style={styles.pricingLabel}>Enable Invoice</span><Toggle on={settings.invoice?.enabled!==false} onToggle={()=>updateNestedSetting("invoice","enabled",settings.invoice?.enabled===false)}/></div><div style={styles.pricingRow}><span style={styles.pricingLabel}>Show Shipping Fee on Invoice</span><Toggle on={settings.invoice?.includeShippingFee!==false} onToggle={()=>updateNestedSetting("invoice","includeShippingFee",settings.invoice?.includeShippingFee===false)}/></div><div style={styles.pricingRow}><span style={styles.pricingLabel}>Invoice Store Name</span><input style={{...styles.adminInput,width:"min(100%,430px)"}} value={settings.invoice?.storeName||""} onChange={e=>updateNestedSetting("invoice","storeName",e.target.value)}/></div><div style={styles.pricingRow}><span style={styles.pricingLabel}>Invoice Email</span><input style={{...styles.adminInput,width:"min(100%,430px)"}} value={settings.invoice?.storeEmail||""} onChange={e=>updateNestedSetting("invoice","storeEmail",e.target.value)}/></div><div style={styles.pricingRow}><span style={styles.pricingLabel}>Invoice Phone</span><input style={{...styles.adminInput,width:"min(100%,430px)"}} value={settings.invoice?.storePhone||""} onChange={e=>updateNestedSetting("invoice","storePhone",e.target.value)}/></div></div>
            {[['shippingMethod','Shipping Method'],['shippingEtaMin','Minimum Delivery Days'],['shippingEtaMax','Maximum Delivery Days'],['handlingDays','Handling Days'],['trackingUrlTemplate','Tracking URL Template']].map(([k,label])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{label}</span><input type={k.includes('Days')?'number':'text'} style={{...styles.adminInput,width:"min(100%,430px)"}} value={settings[k]??""} onChange={e=>updateSetting(k,k.includes('Days')?parseInt(e.target.value)||0:e.target.value)}/></div>)}
            <div style={{fontSize:".78rem",color:"#6f675d",marginTop:10,padding:10,background:"#f7f3eb",borderRadius:8}}>Customer-paid shipping is enabled. There is no free-shipping option in the storefront.</div>
          </div>
          <div style={styles.pricingCard}><h3 style={{marginBottom:14}}>All 50 U.S. States</h3><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:8}}>{US_STATES.map(([code,name])=><div key={code} style={{border:"1px solid #eee",borderRadius:9,padding:10,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}><span style={{fontSize:".78rem"}}><strong>{code}</strong> {name}</span><div style={{display:"flex",alignItems:"center",gap:3}}><span style={{color:"#888",fontSize:".72rem"}}>$</span><input type="number" step="0.01" min="0" style={{...styles.adminInput,width:72,padding:"6px 7px"}} value={settings.shippingZones?.[code]??settings.shippingPrice??0} onChange={e=>updateShippingZone(code,e.target.value)}/></div></div>)}</div></div>
        </div>}

        {adminTab==="orders" && <div>{orders.length===0?<div style={{textAlign:"center",padding:60,color:"#999"}}>{t.noOrders}</div>:<><button style={{...styles.saveBtn,marginBottom:16}} onClick={exportCSV}>{t.exportCSV}</button><div style={{overflowX:"auto"}}><table style={styles.table}><thead><tr>{[t.orderId,t.orderDate,"Customer","Email","Shipping","Total",t.orderStatus,t.invoice].map(h=><th key={h} style={styles.th}>{h}</th>)}</tr></thead><tbody>{orders.map(o=><tr key={o.id}><td style={styles.td}>{o.id}</td><td style={styles.td}>{o.date}</td><td style={styles.td}>{o.shipping?.name}</td><td style={styles.td}>{o.shipping?.email}</td><td style={styles.td}>${Number(o.shippingCost||0).toFixed(2)}</td><td style={styles.td}>${o.total}</td><td style={styles.td}><select value={o.status} onChange={e=>setOrders(os=>os.map(x=>x.id===o.id?{...x,status:e.target.value}:x))} style={{border:"1px solid #ddd",borderRadius:6,padding:"4px 8px",fontSize:".8rem"}}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select></td><td style={styles.td}><button style={{...styles.saveBtn,padding:"6px 9px",fontSize:".72rem"}} onClick={()=>printInvoice(o)}>{t.printInvoice}</button></td></tr>)}</tbody></table></div></>}</div>}

        {adminTab==="customers" && <div style={{overflowX:"auto"}}><table style={styles.table}><thead><tr>{["Name","Email","Phone","City","Orders"].map(h=><th key={h} style={styles.th}>{h}</th>)}</tr></thead><tbody>{customers.map((c,i)=><tr key={i}><td style={styles.td}>{c.name||"-"}</td><td style={styles.td}>{c.email||"-"}</td><td style={styles.td}>{c.phone||"-"}</td><td style={styles.td}>{c.city||"-"}</td><td style={styles.td}>{orders.filter(o=>(o.shipping?.email||o.shipping?.phone||o.shipping?.name)===(c.email||c.phone||c.name)).length}</td></tr>)}</tbody></table></div>}

        {adminTab==="analytics" && <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
            {[['Average Order Value',orders.length?`$${(revenue/orders.length).toFixed(2)}`:'$0.00'],['Pending Orders',orders.filter(o=>o.status==='pending').length],['Delivered Orders',orders.filter(o=>o.status==='delivered').length],['Wishlist Saves',wishlist.length]].map(([label,val])=><div key={label} style={styles.pricingCard}><div style={{fontSize:".72rem",color:"#888"}}>{label}</div><div style={{fontSize:"1.55rem",fontWeight:700,marginTop:7}}>{val}</div></div>)}
          </div>
          <div style={styles.pricingCard}><h3>Top Products by Order Quantity</h3>{products.map(p=>({...p,ordered:orders.reduce((n,o)=>n+(o.items||[]).filter(i=>i.id===p.id).reduce((q,i)=>q+(i.qty||0),0),0)})).sort((a,b)=>b.ordered-a.ordered).slice(0,8).map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #eee",fontSize:".82rem"}}><span>{p.name}</span><strong>{p.ordered}</strong></div>)}</div>
        </div>}

        {adminTab==="marketing" && <div>
          <div style={styles.pricingCard}><h3>Conversion & Merchandising Tools</h3><p style={{color:"#777",fontSize:".82rem",lineHeight:1.5}}>Control modern storefront behaviors without changing the code.</p>
            {[['wishlistEnabled','Wishlist'],['quickViewEnabled','Quick View'],['recentlyViewedEnabled','Recently Viewed'],['backInStockEnabled','Back-in-Stock Alerts'],['lowStockEnabled','Low Stock Labels'],['reviewsEnabled','Product Reviews'],['sizeGuideEnabled','Size Guide'],['compareEnabled','Product Compare']].map(([k,label])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{label}</span><Toggle on={settings[k]!==false} onToggle={()=>updateSetting(k,settings[k]===false)}/></div>)}
          </div>
          <div style={styles.pricingCard}><h3>Campaign Banner</h3>{[['campaignTitle','Campaign Title'],['campaignSubtitle','Campaign Subtitle'],['campaignButton','Button Text'],['campaignLink','Button Link']].map(([k,l])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{l}</span><input style={{...styles.adminInput,width:"min(100%,430px)"}} value={settings[k]||""} onChange={e=>updateSetting(k,e.target.value)}/></div>)}<div style={styles.pricingRow}><span style={styles.pricingLabel}>Campaign Active</span><Toggle on={!!settings.campaignActive} onToggle={()=>updateSetting("campaignActive",!settings.campaignActive)}/></div></div>
        </div>}

        {adminTab==="seo" && <div>
          <div style={styles.pricingCard}><h3>SEO & Social Preview</h3>{[['seoTitle','SEO Title'],['seoDescription','Meta Description'],['seoKeywords','Keywords'],['ogImage','Social Share Image'],['canonicalUrl','Canonical URL']].map(([k,l])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{l}</span>{k==='seoDescription'?<textarea style={{...styles.adminInput,width:"min(100%,430px)",minHeight:80}} value={settings[k]||""} onChange={e=>updateSetting(k,e.target.value)}/>:<input style={{...styles.adminInput,width:"min(100%,430px)"}} value={settings[k]||""} onChange={e=>updateSetting(k,e.target.value)}/>}</div>)}<button style={styles.saveBtn} onClick={()=>saveField('seo')}>{savedMsg.seo?t.saved:t.save}</button></div>
          <div style={styles.pricingCard}><h3>Accessibility & Performance</h3>{[['reducedMotion','Respect Reduced Motion'],['lazyImages','Lazy-load Images'],['highContrast','High Contrast Mode']].map(([k,l])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{l}</span><Toggle on={settings[k]!==false} onToggle={()=>updateSetting(k,settings[k]===false)}/></div>)}</div>
        </div>}

        {adminTab==="content" && <div style={styles.pricingCard}>{Object.keys(settings.content||{}).map(k=><div key={k} style={{marginBottom:16}}><label style={{display:"block",fontSize:".82rem",fontWeight:700,marginBottom:6}}>{k}</label><textarea style={{...styles.adminInput,width:"100%",minHeight:100,resize:"vertical"}} value={settings.content?.[k]||""} onChange={e=>updateNestedSetting("content",k,e.target.value)}/></div>)}<div style={{display:"flex",gap:8}}><button style={styles.saveBtn} onClick={()=>saveField("content")}>{savedMsg.content?t.saved:t.save}</button></div></div>}

        {adminTab==="language" && <div>
          <div style={styles.pricingCard}><h3>Language & Translation Studio</h3><p style={{color:"#777",fontSize:".82rem",lineHeight:1.5}}>Edit every customer-facing UI label in English and Arabic. Changes override the built-in translations immediately and are saved in the CMS.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}><div><strong>English</strong></div><div dir="rtl"><strong>العربية</strong></div></div>
            <div style={{maxHeight:520,overflow:"auto",borderTop:"1px solid #eee"}}>
              {Object.keys(T.en).map(key=><div key={key} style={{display:"grid",gridTemplateColumns:"120px 1fr 1fr",gap:8,alignItems:"start",padding:"9px 0",borderBottom:"1px solid #f0f0f0"}}>
                <code style={{fontSize:".65rem",color:"#777",wordBreak:"break-word"}}>{key}</code>
                <input style={styles.adminInput} value={settings.translations?.en?.[key] ?? T.en[key] ?? ""} onChange={e=>updateTranslation('en',key,e.target.value)}/>
                <input dir="rtl" style={styles.adminInput} value={settings.translations?.ar?.[key] ?? T.ar[key] ?? ""} onChange={e=>updateTranslation('ar',key,e.target.value)}/>
              </div>)}
            </div>
            <button style={{...styles.saveBtn,marginTop:14}} onClick={()=>{saveField('language');addAudit('Updated translations','English and Arabic UI labels');}}>{savedMsg.language?t.saved:t.save}</button>
          </div>
          <div style={styles.pricingCard}><h3>Bilingual Section Copy</h3><p style={{color:"#777",fontSize:".78rem"}}>Every homepage section can be corrected or rewritten independently in English and Arabic.</p>{(settings.homepageSections||[]).map(sec=><div key={sec.id} style={{border:"1px solid #eee",borderRadius:10,padding:12,marginTop:10}}><strong>{sec.id}</strong><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}><input style={styles.adminInput} value={sec.title||""} onChange={e=>updateHomepageSection(sec.id,"title",e.target.value)} placeholder="English title"/><input dir="rtl" style={styles.adminInput} value={sec.titleAr||""} onChange={e=>updateHomepageSection(sec.id,"titleAr",e.target.value)} placeholder="Arabic title"/><textarea style={{...styles.adminInput,minHeight:80}} value={sec.body||""} onChange={e=>updateHomepageSection(sec.id,"body",e.target.value)} placeholder="English body"/><textarea dir="rtl" style={{...styles.adminInput,minHeight:80}} value={sec.bodyAr||""} onChange={e=>updateHomepageSection(sec.id,"bodyAr",e.target.value)} placeholder="Arabic body"/></div></div>)}</div>
          <div style={styles.pricingCard}><h3>Language Experience</h3>
            <div style={styles.pricingRow}><span style={styles.pricingLabel}>Default Store Language</span><select style={styles.adminInput} value={settings.defaultLanguage||'en'} onChange={e=>updateSetting('defaultLanguage',e.target.value)}><option value="en">English</option><option value="ar">Arabic</option></select></div>
            <div style={styles.pricingRow}><span style={styles.pricingLabel}>Allow Language Switcher</span><Toggle on={settings.languageSwitcher!==false} onToggle={()=>updateSetting('languageSwitcher',settings.languageSwitcher===false)}/></div>
            <div style={styles.pricingRow}><span style={styles.pricingLabel}>Arabic RTL</span><Toggle on={settings.arabicRTL!==false} onToggle={()=>updateSetting('arabicRTL',settings.arabicRTL===false)}/></div>
          </div>
        </div>}

        {adminTab==="media" && <div style={styles.pricingCard}><h3>Media Library</h3><p style={{color:"#777",fontSize:".85rem"}}>This browser-only version stores image URLs. Use the Homepage, Banner and Product image controls to add or replace media.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:10,marginTop:16}}>{[...new Set([...products.map(p=>p.image),...(settings.heroImages||[]),...(settings.banners||[]).map(b=>b.image)].filter(Boolean))].map((img,i)=><div key={i} style={{border:"1px solid #eee",padding:6,borderRadius:8}}><img src={img} alt="" onError={onImgErr} style={{width:"100%",height:120,objectFit:"cover",borderRadius:5}}/><div style={{fontSize:".6rem",wordBreak:"break-all",marginTop:5,color:"#777"}}>{img}</div></div>)}</div></div>}

        {adminTab==="navigation" && <div>
          <div style={styles.pricingCard}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h3>Navigation & Menus</h3><p style={{color:"#777",fontSize:".78rem"}}>Control every menu label, destination, visibility and order in English and Arabic.</p></div><button style={styles.saveBtn} onClick={addNavItem}>+ Add Link</button></div>
            {(settings.navigation?.items||[]).sort((a,b)=>(a.order||0)-(b.order||0)).map(item=><div key={item.id} style={{border:"1px solid #eee",borderRadius:10,padding:12,marginTop:10}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1.2fr 80px auto",gap:8,alignItems:"center"}}><input style={styles.adminInput} value={item.labelEn||""} onChange={e=>updateNavItem(item.id,"labelEn",e.target.value)} placeholder="English label"/><input dir="rtl" style={styles.adminInput} value={item.labelAr||""} onChange={e=>updateNavItem(item.id,"labelAr",e.target.value)} placeholder="Arabic label"/><input style={styles.adminInput} value={item.href||""} onChange={e=>updateNavItem(item.id,"href",e.target.value)} placeholder="Link / URL"/><Toggle on={item.active!==false} onToggle={()=>updateNavItem(item.id,"active",item.active===false)}/><button style={{...styles.navBtn,color:"#e53935"}} onClick={()=>deleteNavItem(item.id)}>Delete</button></div></div>)}
            <button style={{...styles.saveBtn,marginTop:14}} onClick={()=>{saveField("navigation");addAudit("Updated navigation","English and Arabic menu structure");}}>{savedMsg.navigation?t.saved:t.save}</button>
          </div>
        </div>}

        {adminTab==="checkoutSettings" && <div>
          <div style={styles.pricingCard}><h3>Checkout & Customer Experience</h3>{Object.entries(settings.checkout||{}).map(([k,v])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{k}</span>{typeof v==="boolean"?<Toggle on={v} onToggle={()=>updateCmsGroup("checkout",k,!v)}/>:<input style={{...styles.adminInput,width:"min(100%,520px)"}} value={v??""} onChange={e=>updateCmsGroup("checkout",k,e.target.value)}/>}</div>)}<button style={styles.saveBtn} onClick={()=>saveField("checkoutSettings")}>{savedMsg.checkoutSettings?t.saved:t.save}</button></div>
          <div style={styles.pricingCard}><h3>Storefront Features</h3>{Object.entries(settings.customerExperience||{}).map(([k,v])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{k}</span>{typeof v==="boolean"?<Toggle on={v} onToggle={()=>updateCmsGroup("customerExperience",k,!v)}/>:<input style={{...styles.adminInput,width:"min(100%,520px)"}} value={v??""} onChange={e=>updateCmsGroup("customerExperience",k,e.target.value)}/>}</div>)}</div>
        </div>}

        {adminTab==="notifications" && <div><div style={styles.pricingCard}><h3>Notifications & Email Templates</h3>{Object.entries(settings.notifications||{}).filter(([k])=>k!=="templates").map(([k,v])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{k}</span>{typeof v==="boolean"?<Toggle on={v} onToggle={()=>updateCmsGroup("notifications",k,!v)}/>:<input style={{...styles.adminInput,width:"min(100%,520px)"}} value={v??""} onChange={e=>updateCmsGroup("notifications",k,e.target.value)}/>}</div>)}</div><div style={styles.pricingCard}><h3>Templates — English / Arabic</h3>{Object.entries(settings.notifications?.templates||{}).map(([k,v])=><div key={k} style={{marginBottom:12}}><label style={{fontSize:".75rem",fontWeight:700}}>{k}</label><textarea style={{...styles.adminInput,width:"100%",minHeight:70}} value={v||""} onChange={e=>setSettings(s=>({...s,notifications:{...s.notifications,templates:{...s.notifications.templates,[k]:e.target.value}}}))}/></div>)}<button style={styles.saveBtn} onClick={()=>saveField("notifications")}>{savedMsg.notifications?t.saved:t.save}</button></div></div>}

        {adminTab==="policies" && <div><div style={styles.pricingCard}><h3>Policies, Legal & Customer Information</h3>{Object.entries(settings.policies||{}).map(([k,v])=><div key={k} style={{marginBottom:14}}><label style={{display:"block",fontSize:".76rem",fontWeight:700,marginBottom:5}}>{k}</label><textarea style={{...styles.adminInput,width:"100%",minHeight:100}} value={v||""} onChange={e=>updateCmsGroup("policies",k,e.target.value)}/></div>)}<button style={styles.saveBtn} onClick={()=>saveField("policies")}>{savedMsg.policies?t.saved:t.save}</button></div></div>}

        {adminTab==="integrations" && <div><div style={styles.pricingCard}><h3>Integrations, Analytics & Tracking</h3><p style={{color:"#777",fontSize:".78rem"}}>Keep third-party IDs and URLs editable without touching source code.</p>{Object.entries(settings.integrations||{}).map(([k,v])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{k}</span><input style={{...styles.adminInput,width:"min(100%,520px)"}} value={v||""} onChange={e=>updateCmsGroup("integrations",k,e.target.value)}/></div>)}<button style={styles.saveBtn} onClick={()=>saveField("integrations")}>{savedMsg.integrations?t.saved:t.save}</button></div></div>}

        {adminTab==="localization" && <div><div style={styles.pricingCard}><h3>Localization & Internationalization</h3>{Object.entries(settings.localization||{}).filter(([k])=>k!=="enabledLanguages").map(([k,v])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{k}</span>{typeof v==="boolean"?<Toggle on={v} onToggle={()=>updateCmsGroup("localization",k,!v)}/>:<input style={{...styles.adminInput,width:"min(100%,520px)"}} value={Array.isArray(v)?v.join(", "):v??""} onChange={e=>updateCmsGroup("localization",k,e.target.value)}/>}</div>)}<div style={{marginTop:16}}><strong>Enabled Languages</strong><div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:8}}>{(settings.localization?.enabledLanguages||[]).map(lang=><div key={lang} style={{display:"flex",gap:6,alignItems:"center",border:"1px solid #ddd",borderRadius:20,padding:"5px 9px"}}><input style={{border:0,outline:0,width:90}} value={lang} onChange={e=>{const next=(settings.localization?.enabledLanguages||[]).map(x=>x===lang?e.target.value:x);updateCmsGroup("localization","enabledLanguages",next)}}/><button style={{border:0,background:"none",cursor:"pointer"}} onClick={()=>removeLanguage(lang)}>×</button></div>)}<button style={styles.navBtn} onClick={addLanguage}>+ Language</button></div></div><button style={{...styles.saveBtn,marginTop:14}} onClick={()=>saveField("localization")}>{savedMsg.localization?t.saved:t.save}</button></div></div>}

        {adminTab==="control" && <div>
          <div style={styles.pricingCard}><h3>Everything Control Center</h3><p style={{color:"#777",fontSize:".82rem",lineHeight:1.55}}>Super Admin workspace for every operational, visual, language, legal, marketing, checkout and customer-facing setting. If a value is stored in the CMS, you can change it here or through the dedicated section.</p></div>
          {["siteMeta","storefront","shippingRules","inventory","marketing","accessibility","security"].map(group=><div key={group} style={styles.pricingCard}><h3>{group}</h3>{Object.entries(settings[group]||{}).map(([k,v])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{k}</span>{typeof v==="boolean"?<Toggle on={v} onToggle={()=>updateCmsGroup(group,k,!v)}/>:Array.isArray(v)?<input style={{...styles.adminInput,width:"min(100%,520px)"}} value={v.join(", ")} onChange={e=>updateCmsGroup(group,k,e.target.value.split(",").map(x=>x.trim()).filter(Boolean))}/>:typeof v==="object"&&v!==null?<textarea style={{...styles.adminInput,width:"min(100%,520px)",minHeight:90,fontFamily:"monospace",direction:"ltr"}} value={JSON.stringify(v,null,2)} onChange={e=>{try{updateCmsGroup(group,k,JSON.parse(e.target.value))}catch{}}}/>:<input style={{...styles.adminInput,width:"min(100%,520px)"}} value={v??""} onChange={e=>updateCmsGroup(group,k,e.target.value)}/>}</div>)}<button style={styles.saveBtn} onClick={()=>saveField(group)}>{savedMsg[group]?t.saved:t.save}</button></div>)}
          <div style={styles.pricingCard}><h3>Custom Copy Dictionary</h3><p style={{color:"#777",fontSize:".78rem"}}>Create additional English/Arabic phrases without changing the source code.</p>{["en","ar"].map(locale=><div key={locale} style={{marginTop:14}}><h4>{locale==="en"?"English":"العربية"}</h4>{Object.entries(settings.customCopy?.[locale]||{}).map(([key,val])=><div key={key} style={{display:"grid",gridTemplateColumns:"180px 1fr auto",gap:8,marginBottom:8}}><input style={styles.adminInput} value={key} readOnly/><input dir={locale==="ar"?"rtl":"ltr"} style={styles.adminInput} value={val||""} onChange={e=>setSettings(s=>({...s,customCopy:{...s.customCopy,[locale]:{...s.customCopy[locale],[key]:e.target.value}}}))}/><button style={{...styles.navBtn,color:"#e53935"}} onClick={()=>deleteCustomCopy(locale,key)}>Delete</button></div>)}<button style={styles.navBtn} onClick={()=>addCustomCopy(locale)}>+ Add Copy</button></div>)}<button style={{...styles.saveBtn,marginTop:14}} onClick={()=>{saveField("control");addAudit("Updated universal CMS controls","Global settings and custom copy");}}>{savedMsg.control?t.saved:t.save}</button></div>
        </div>}

        {adminTab==="advanced" && <div>
          <div style={styles.pricingCard}><h3>Admin Command Center</h3><p style={{color:"#777",fontSize:".82rem"}}>Super Admin controls for the complete storefront. This local build keeps everything in the browser storage; connect these structures to your backend when moving to production.</p>
            {[['maintenanceMode','Maintenance Mode'],['storefrontPublished','Storefront Published'],['allowGuestCheckout','Guest Checkout'],['showAdminShortcut','Show Admin Shortcut'],['enableAuditLog','Enable Audit Log'],['enableDraftPreview','Draft Preview']].map(([k,l])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{l}</span><Toggle on={settings[k]!==false} onToggle={()=>updateSetting(k,settings[k]===false)}/></div>)}
          </div>
          <div style={styles.pricingCard}><h3>Admin Roles & Permissions</h3>{(settings.adminRoles||[]).map(role=><div key={role.id} style={{border:"1px solid #eee",borderRadius:10,padding:12,marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",gap:8}}><input style={styles.adminInput} value={role.name||""} onChange={e=>setSettings(s=>({...s,adminRoles:s.adminRoles.map(r=>r.id===role.id?{...r,name:e.target.value}:r)}))}/><button style={{...styles.navBtn}} onClick={()=>setSettings(s=>({...s,adminRoles:s.adminRoles.filter(r=>r.id!==role.id)}))}>Remove</button></div><div style={{fontSize:".7rem",color:"#777",marginTop:7}}>Permissions: {role.permissions?.join(', ')}</div></div>)}
            <button style={styles.saveBtn} onClick={()=>{saveField('advanced');addAudit('Updated admin roles','Admin permissions configuration');}}>{savedMsg.advanced?t.saved:t.save}</button>
          </div>
          <div style={styles.pricingCard}><h3>Audit Log</h3>{(settings.adminAuditLog||[]).slice(0,50).map(item=><div key={item.id} style={{padding:"9px 0",borderBottom:"1px solid #eee",fontSize:".75rem"}}><strong>{item.action}</strong><div style={{color:"#777"}}>{item.details} · {new Date(item.at).toLocaleString()}</div></div>)}</div>
          <div style={styles.pricingCard}><h3>Global Customer-Facing Text</h3><p style={{color:"#777",fontSize:".78rem"}}>Use the Language tab for every UI label, and this Content tab for longer editorial pages. Never hard-code customer-facing wording when it can be managed here.</p><button style={styles.saveBtn} onClick={()=>setAdminTab('language')}>Open Translation Studio</button></div>
        </div>}

        {adminTab==="sections" && <div>
          <div style={styles.pricingCard}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h3>Sections & Pages Manager</h3><button style={styles.saveBtn} onClick={addHomepageSection}>+ Add Section</button></div>
            <p style={{color:"#777",fontSize:".8rem"}}>Control every custom homepage section in both English and Arabic. Change wording, images, CTA links, order, and visibility.</p>
            {(settings.homepageSections||[]).sort((a,b)=>(a.order||0)-(b.order||0)).map(sec=><div key={sec.id} style={{border:"1px solid #eee",borderRadius:10,padding:12,marginTop:10}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 90px 90px",gap:8}}><input style={styles.adminInput} placeholder="English title" value={sec.title||""} onChange={e=>updateHomepageSection(sec.id,"title",e.target.value)}/><input dir="rtl" style={styles.adminInput} placeholder="Arabic title" value={sec.titleAr||""} onChange={e=>updateHomepageSection(sec.id,"titleAr",e.target.value)}/><input type="number" style={styles.adminInput} value={sec.order||0} onChange={e=>updateHomepageSection(sec.id,"order",Number(e.target.value)||0)}/><Toggle on={sec.active!==false} onToggle={()=>updateHomepageSection(sec.id,"active",sec.active===false)}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}><textarea style={{...styles.adminInput,minHeight:70}} placeholder="English body" value={sec.body||""} onChange={e=>updateHomepageSection(sec.id,"body",e.target.value)}/><textarea dir="rtl" style={{...styles.adminInput,minHeight:70}} placeholder="Arabic body" value={sec.bodyAr||""} onChange={e=>updateHomepageSection(sec.id,"bodyAr",e.target.value)}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:8,marginTop:8}}><input style={styles.adminInput} placeholder="Image URL" value={sec.image||""} onChange={e=>updateHomepageSection(sec.id,"image",e.target.value)}/><input style={styles.adminInput} placeholder="Button text" value={sec.buttonText||""} onChange={e=>updateHomepageSection(sec.id,"buttonText",e.target.value)}/><input style={styles.adminInput} placeholder="Button link" value={sec.buttonLink||""} onChange={e=>updateHomepageSection(sec.id,"buttonLink",e.target.value)}/><button style={{...styles.navBtn,color:"#e53935"}} onClick={()=>deleteHomepageSection(sec.id)}>Delete</button></div></div>)}
            <button style={{...styles.saveBtn,marginTop:12}} onClick={()=>{saveField("sections");addAudit("Updated homepage sections","Section copy, order and visibility");}}>{savedMsg.sections?t.saved:t.save}</button>
          </div>
        </div>}
        {adminTab==="access" && <div>
          <div style={styles.pricingCard}><h3>Admin Roles & Permissions</h3><p style={{color:"#777",fontSize:".8rem"}}>Define which areas each role can access. Super Admin should remain unrestricted.</p>{(settings.adminRoles||[]).map(role=><div key={role.id} style={{border:"1px solid #eee",borderRadius:10,padding:12,marginBottom:10}}><div style={{display:"flex",gap:8,alignItems:"center"}}><input style={{...styles.adminInput,flex:1}} value={role.name||""} onChange={e=>setSettings(s=>({...s,adminRoles:s.adminRoles.map(r=>r.id===role.id?{...r,name:e.target.value}:r)}))}/><button style={styles.navBtn} onClick={()=>setSettings(s=>({...s,adminRoles:s.adminRoles.filter(r=>r.id!==role.id)}))}>Remove</button></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:8,marginTop:10}}>{["dashboard","homepage","sections","products","categories","banners","pricing","shipping","orders","customers","analytics","marketing","content","language","media","seo","settings","advanced"].map(permission=><label key={permission} style={{display:"flex",justifyContent:"space-between",padding:8,border:"1px solid #eee",borderRadius:7,fontSize:".72rem"}}>{permission}<Toggle on={role.permissions?.includes(permission)} onToggle={()=>setSettings(s=>({...s,adminRoles:s.adminRoles.map(r=>{if(r.id!==role.id)return r; const p=r.permissions||[]; return {...r,permissions:p.includes(permission)?p.filter(x=>x!==permission):[...p,permission]};})}))}/></label>)}</div></div>)}
            <button style={styles.saveBtn} onClick={()=>{saveField("access");addAudit("Updated admin permissions","Role access matrix");}}>{savedMsg.access?t.saved:t.save}</button>
          </div>
          <div style={styles.pricingCard}><h3>Storefront Feature Switchboard</h3>{[["wishlistEnabled","Wishlist"],["quickViewEnabled","Quick View"],["recentlyViewedEnabled","Recently Viewed"],["backInStockEnabled","Back in Stock"],["lowStockEnabled","Low Stock"],["reviewsEnabled","Reviews"],["sizeGuideEnabled","Size Guide"],["compareEnabled","Product Compare"],["stickyHeader","Sticky Header"],["smoothScroll","Smooth Scroll"],["productHoverZoom","Product Hover Zoom"],["showTrustBadges","Trust Badges"],["showShippingEta","Shipping ETA"],["languageSwitcher","Language Switcher"],["arabicRTL","Arabic RTL"],["enableDraftPreview","Draft Preview"],["maintenanceMode","Maintenance Mode"]].map(([k,l])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{l}</span><Toggle on={settings[k]!==false} onToggle={()=>updateSetting(k,settings[k]===false)}/></div>)}</div>
        </div>}
        {adminTab==="settings" && <div>
          <div style={styles.pricingCard}>{[["storeName","Store Name"],["storeTagline","Tagline"],["paypalClientId","PayPal Client ID"],["whatsapp","WhatsApp Number"],["instagram","Instagram"],["snapchat","Snapchat"],["tiktok","TikTok"],["adminPassword","Admin Password"]].map(([k,label])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{label}</span><input type={k==="adminPassword"?"password":"text"} style={{...styles.adminInput,width:260}} value={settings[k]||""} onChange={e=>updateSetting(k,e.target.value)}/></div>)}<button style={styles.saveBtn} onClick={()=>saveField("settings")}>{savedMsg.settings?t.saved:t.save}</button></div>
          <div style={styles.pricingCard}><h3>Storefront Experience</h3><p style={{color:"#777",fontSize:".76rem"}}>For complete control, use the Everything Control tab. It exposes additional operational, localization, security and customer-experience settings.</p>{[['stickyHeader','Sticky Header'],['smoothScroll','Smooth Scrolling'],['productHoverZoom','Product Image Hover Zoom'],['showTrustBadges','Trust Badges'],['showShippingEta','Show Delivery Estimate']].map(([k,l])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{l}</span><Toggle on={settings[k]!==false} onToggle={()=>updateSetting(k,settings[k]===false)}/></div>)}</div>
          <div style={styles.pricingCard}><h3>Appearance</h3>{[["primaryColor","Primary Color"],["secondaryColor","Secondary Color"]].map(([k,l])=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{l}</span><input type="color" value={settings.appearance?.[k]||"#000000"} onChange={e=>updateNestedSetting("appearance",k,e.target.value)} /><input style={styles.adminInput} value={settings.appearance?.[k]||""} onChange={e=>updateNestedSetting("appearance",k,e.target.value)}/></div>)}<div style={styles.pricingRow}><span style={styles.pricingLabel}>Button Radius</span><input type="number" style={styles.adminInput} value={settings.appearance?.buttonRadius||8} onChange={e=>updateNestedSetting("appearance","buttonRadius",parseInt(e.target.value)||0)}/></div></div>
          <div style={styles.pricingCard}><h3>Footer</h3>{Object.keys(settings.footer||{}).map(k=><div key={k} style={styles.pricingRow}><span style={styles.pricingLabel}>{k}</span><input style={{...styles.adminInput,width:"min(100%,420px)"}} value={settings.footer?.[k]||""} onChange={e=>updateNestedSetting("footer",k,e.target.value)}/></div>)}</div>
          <div style={{display:"flex",gap:8}}><button style={{...styles.saveBtn,background:"#9b2c2c"}} onClick={resetCmsSettings}>Reset CMS Defaults</button></div>
        </div>}
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
                🇺🇸&nbsp; SHIPPING TO ALL 50 STATES &nbsp;·&nbsp; 🇺🇸&nbsp; SHIPPING TO ALL 50 STATES &nbsp;·&nbsp;
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
              🇺🇸&nbsp; SHIPPING TO ALL 50 STATES &nbsp;·&nbsp; 🇺🇸&nbsp; SHIPPING TO ALL 50 STATES &nbsp;·&nbsp;
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
