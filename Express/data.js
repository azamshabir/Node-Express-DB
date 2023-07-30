const products = [
  {
    id: 1,
    name: 'albany sofa',
    image:
      'https://dl.airtable.com/.attachments/6ac7f7b55d505057317534722e5a9f03/9183491e/product-3.jpg',
    price: 39.95,
    desc: `I'm baby direct trade farm-to-table hell of, YOLO readymade raw denim venmo whatever organic gluten-free kitsch schlitz irony af flexitarian.`,
  },
  {
    id: 2,
    name: 'entertainment center',
    image:
      'https://dl.airtable.com/.attachments/da5e17fd71f50578d525dd5f596e407e/d5e88ac8/product-2.jpg',
    price: 29.98,
    desc: `I'm baby direct trade farm-to-table hell of, YOLO readymade raw denim venmo whatever organic gluten-free kitsch schlitz irony af flexitarian.`,
  },
  {
    id: 3,
    name: 'albany sectional',
    image:
      'https://dl.airtable.com/.attachments/05ecddf7ac8d581ecc3f7922415e7907/a4242abc/product-1.jpeg',
    price: 10.99,
    desc: `I'm baby direct trade farm-to-table hell of, YOLO readymade raw denim venmo whatever organic gluten-free kitsch schlitz irony af flexitarian.`,
  },
  {
    id: 4,
    name: 'leather sofa',
    image:
      'https://dl.airtable.com/.attachments/3245c726ee77d73702ba8c3310639727/f000842b/product-5.jpg',
    price: 9.99,
    desc: `I'm baby direct trade farm-to-table hell of, YOLO readymade raw denim venmo whatever organic gluten-free kitsch schlitz irony af flexitarian.`,
  },
]
const people = [
  { id: 1, name: 'john' },
  { id: 2, name: 'peter' },
  { id: 3, name: 'susan' },
  { id: 4, name: 'anna' },
  { id: 5, name: 'emma' },
]

const products_New = [{
          id: '1',
          name: "Android Small Removable Sticker Sheet",
          description: "Show your Android pride by placing these 8 fun stickers on your technology products or accessories!",
          features: "<p>8 Android stickers</p>\n<p>White colored sticker sheet</p>",
          price: "2.99",
          keywords: "Android Small Removable Sticker Sheet, android stickers, sticker sheets, removable sticker sheets, small sticker sheet, android small sticker sheets, Android Sheet",
          url:"Android+Small+Removable+Sticker+Sheet",
          category: "accessories",
          subcategory: "accessories"
        },
        {
          id: 2,
          name: "Android Large Removable Sticker Sheet",
          description: "Show your quirky side by placing these fun Android stickers on your personal belongings.",
          features: "<p>Android Stickers</p>\n<p>White Colored Sticker Sheet</p>",
          price: "2.99",
          keywords: "Android Large Removable Sticker Sheet, android stickers, sticker sheets, removable sticker sheets, large sticker sheet, android large sticker sheets, Android Sheet",
          url: "Android+Large+Removable+Sticker+Sheet",
          category: "accessories",
          subcategory: "accessories"
        },
        {
          id: 3,
          name: "Google Bot",
          description: "This Google Bot can hold multiple poses making it a fun toy for all. Fold the Google Bot back up into a perfect cube when you are done playing.",
          features: "<p>Made of wood</p>\n<p>2.5 x 2.5 inch cube</p>\n<p>6.75 inch tall</p>\n<p>Recommended for Ages 3+</p>",
          price: "9.99",
          keywords: "Google Bot, google bot, bots, natural bots, wood bot, google wood bot",
          url: "Google+Bot",
          category: "accessories",
          subcategory: "accessories"
        },
        {
          id: 4,
          name: "Google Emoji Sticker Pack",
          description: "Who doesn't use emojis? Decorate your space with your current mood!",
          features: "<p>Pack contains two sticker sheets</p>\n<p>Each Sheet has different emojis</p>\n<p><span>Decal dimensions should fit in a maximum sheet size of 12 3/4 x 17 1/2 inch.</span></p>",
          price: "4.99",
          keywords: "Google Emoji Sticker Pack, Google sticker pack, emoji sticker pack, google emoji, stickers, pack of sticker, pack of emoji stickers",
          url: "Google+Emoji+Sticker+Pack+2+sheet",
          category: "accessories",
          subcategory: "accessories"
        },
        {
          id: 5,
          name: "Waze Pack of 9 Decal Set",
          description: "Can't decide which Waze decal to get? We have made that decision easier for you! Now you can purchase a pack of nine Waze Mood Decals!",
          features: "<p>Pack of 9 includes:</p>\n<p>3 Waze Mood Happy decals</p>\n<p>3 Waze Mood Original decals</p>\n<p>3 Waze Mood Ninja decals</p>",
          price: "16.99",
          keywords: "Waze Pack of 9 Decal Set, decals pack, packs of 9, Waze Packs, Waze Decals, waze, Waze",
          url:"Waze+Pack+of+9+decal+set",
          category: "accessories",
          subcategory: "accessories"
        },
        {
          id: 6,
          name: "Google Twill Cap",
          description: "Classic urban styling distinguishes this Google cap. Retains its shape, even when not being worn.",
          features: "<p>Heavy weight brushed twill</p>\n<p>Adjustable velcro closure</p>\n<p>One size fits all</p>",
          price: "10.99",
          keywords: "Google Twill Cap, Google Cap, Google Twill Caps, Google Twill, google cap, google caps, google twill, google twill black cap, google black caps, google caps, black caps, Google Caps",
          url:"Google+Twill+Cap",
          category: "apparel",
          subcategory: "apparel"
        },
        {
            id: 7,
            name: "Google Fold-over Beanie Grey",
            description: "Keep you ears warm while enjoying a cold winter day with this Google Fold-over Beanie.",
            features: "<p>100% acrylic</p>\n<p>One size fits all</p>",
            price: "9.99",
            keywords: "Google Fold-over Beanie Grey, gray beanie, grey beanie, Google Beanies, Fold over grey, Google Beanie Grey, Google headgear",
            url:"Google+Fold+over+beanie+grey",
            category: "apparel",
            subcategory: "apparel"
          },
          {
            id: 8,
            name: "Google Pom Beanie Charcoal",
            description: "Stay stylish and warm this winter season with this Google Pom Beanie.",
            features: "<p>Thick knit texture outside</p>\n<p>Soft plush inside</p>\n<p>Faux fur pom on top</p>",
            price: "19.99",
            keywords: "Google Pom Beanie Charcoal, pom beanie, charcoal pom beanies, Google Beanies, Pom Beanies, charcoal Google pom, beanies, headgear",
            url:"Google+Pom+Beanie+Charcoal",
            category: "apparel",
            subcategory: "apparel"
          },
          {
            id: 9,
            name: "Waze Women's Short Sleeve Tee",
            description: "Made of soft tri-blend jersey fabric, this great t-shirt will help you find your Waze. Made in USA.",
            features: "<p>Jersey knit</p>\n<p>37.5% cotton, 50% polyester, 12.5% rayon</p>\n<p>Made in the USA</p>",
            price: "18.99",
            keywords: "Waze Women's Short Sleeve Tee, Waze Short Sleeve Tee, Waze Women's Tees, Waze Women's tee, waze ladies tees, waze ladies tee, waze short sleeve tees, waze short sleeve tee",
            url:"Waze+Womens+Short+Sleeve+Tee",
            category: "apparel",
            subcategory: "apparel"
          },
          {
            id: 10,
            name: "Waze Men's Short Sleeve Tee",
            description: "Made of soft tri-blend jersey fabric, this great t-shirt will help you find your Waze. Made in USA.",
            features: "<p>Jersey knit</p>\n<p>37.5% cotton, 50% polyester, 12.5% rayon</p>\n<p>Made in the USA</p>",
            price: "18.99",
            keywords: "Waze Men's Short Sleeve Tee, Waze Short Sleeve Tee, Waze Men's Tees, Waze Men's tee, waze mens tees, waze mens tee, waze short sleeve tees, waze short sleeve tee",
            url:"Waze+Mens+Short+Sleeve+Tee",
            category: "apparel",
            subcategory: "apparel"
          },
          {
            id: 11,
            description: "Choose to carry your belongings and presentations to your next meeting with the Google Mistral Rucksack!",
            features: "<p>Size: 13.5 x 6.5 x 17.5</p>\n<p>Ergonomic padded shoulder straps</p>\n<p>Large main compartment with internal laptop compartment</p>\n<p>Easy Snap and Adjustable straps for main compartment access</p>",
            price: "79.99",
            keywords: "Mistral Rucksack, Mistral backpack, Mistral Backpack, backpack, bags, bag, Backpack, backpacks, packs, office gear, Bag, Bags, Google Backpack, google backpack, g, google",
            url:"Google+Rucksack",
            category: "bags",
            subcategory: "bags"
          }
      ]

module.exports={products, people, products_New}