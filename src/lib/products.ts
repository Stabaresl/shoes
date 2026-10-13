// Catálogo LOCAL de respaldo. Si CATALOGO_URL no está configurada (o la hoja de
// Google no responde), la tienda usa estos productos. Ver src/lib/catalogo.ts.
//
// PLACEHOLDER: precios, descripciones y tallas son datos de ejemplo generados para
// maquetar el sitio. Las imágenes son fotos reales del catálogo; los nombres de
// color son una lectura visual aproximada.

export interface ProductSize {
  size: number;
  available: boolean;
}

export interface Product {
  slug: string;
  brand: string;
  model: string;
  name: string;
  colorway: string;
  /** "deportivo", "urbano", "casual"… (en minúsculas, sin tildes). */
  category: string;
  price: number;
  description: string;
  images: string[];
  sizes: ProductSize[];
  /** Sale en la galería grande de la portada. */
  cover?: boolean;
  /** Sale en "Lo más pedido". */
  featured?: boolean;
}

export const catalogoLocal: Product[] = [
  {
    "slug": "adidas-samba-blanco-negro",
    "brand": "Adidas",
    "model": "Samba",
    "name": "Adidas Samba",
    "colorway": "Blanco / Negro",
    "category": "urbano",
    "price": 444000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/adidas-samba-blanco-negro-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-samba-blanco-rojo",
    "brand": "Adidas",
    "model": "Samba",
    "name": "Adidas Samba",
    "colorway": "Blanco / Rojo",
    "category": "urbano",
    "price": 339000,
    "description": "De esas que cuentas por qué las compraste. Estilo urbano sin esfuerzo.",
    "images": [
      "/products/urbano/adidas-samba-blanco-rojo-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": false
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "asics-gel-blanco-negro",
    "brand": "Asics",
    "model": "Gel",
    "name": "Asics Gel",
    "colorway": "Blanco / Negro",
    "category": "deportivo",
    "price": 459000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/asics-gel-blanco-negro-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": false
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-spezial-verde-oliva",
    "brand": "Adidas",
    "model": "Spezial",
    "name": "Adidas Spezial",
    "colorway": "Verde Oliva",
    "category": "urbano",
    "price": 429000,
    "description": "De esas que cuentas por qué las compraste. Estilo urbano sin esfuerzo.",
    "images": [
      "/products/urbano/adidas-spezial-verde-oliva-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": false
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "jordan-3-retro-crema-rosa",
    "brand": "Jordan",
    "model": "3 Retro",
    "name": "Jordan 3 Retro",
    "colorway": "Crema / Rosa",
    "category": "urbano",
    "price": 219000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/jordan-3-retro-crema-rosa-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-samba-negro-crema",
    "brand": "Adidas",
    "model": "Samba",
    "name": "Adidas Samba",
    "colorway": "Negro / Crema",
    "category": "urbano",
    "price": 309000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/adidas-samba-negro-crema-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-samba-cafe-blanco",
    "brand": "Adidas",
    "model": "Samba",
    "name": "Adidas Samba",
    "colorway": "Café / Blanco",
    "category": "urbano",
    "price": 564000,
    "description": "De esas que cuentas por qué las compraste. Estilo urbano sin esfuerzo.",
    "images": [
      "/products/urbano/adidas-samba-cafe-blanco-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": false
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": false
      }
    ]
  },
  {
    "slug": "adidas-samba-plata-metalizado",
    "brand": "Adidas",
    "model": "Samba",
    "name": "Adidas Samba",
    "colorway": "Plata Metalizado",
    "category": "urbano",
    "price": 504000,
    "description": "Silueta retro con carácter: la que combinas con todo y queda bien con nada que perder.",
    "images": [
      "/products/urbano/adidas-samba-plata-metalizado-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": false
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "on-cloud-lila-crema",
    "brand": "On",
    "model": "Cloud",
    "name": "On Cloud",
    "colorway": "Lila / Crema",
    "category": "deportivo",
    "price": 414000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/on-cloud-lila-crema-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": false
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-1906r-blanco-negro",
    "brand": "New Balance",
    "model": "1906R",
    "name": "New Balance 1906R",
    "colorway": "Blanco / Negro",
    "category": "urbano",
    "price": 489000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/new-balance-1906r-blanco-negro-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-1906a-gris-rosa",
    "brand": "New Balance",
    "model": "1906A",
    "name": "New Balance 1906A",
    "colorway": "Gris / Rosa",
    "category": "deportivo",
    "price": 264000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/new-balance-1906a-gris-rosa-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "on-cloud-negro-blanco",
    "brand": "On",
    "model": "Cloud",
    "name": "On Cloud",
    "colorway": "Negro / Blanco",
    "category": "deportivo",
    "price": 234000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/on-cloud-negro-blanco-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": false
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": false
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "nike-initiator-blanco-verde",
    "brand": "Nike",
    "model": "Initiator",
    "name": "Nike Initiator",
    "colorway": "Blanco / Verde",
    "category": "deportivo",
    "price": 339000,
    "description": "Técnica hasta el último detalle, cómoda desde el primer paso.",
    "images": [
      "/products/deportivo/nike-initiator-blanco-verde-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": false
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "jordan-1-low-cafe-mocha",
    "brand": "Jordan",
    "model": "1 Low",
    "name": "Jordan 1 Low",
    "colorway": "Café Mocha",
    "category": "urbano",
    "price": 219000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/jordan-1-low-travis-cafe-01.jpg",
      "/products/urbano/jordan-1-low-travis-cafe-02.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "nike-mercurial-rosa-morado",
    "brand": "Nike",
    "model": "Mercurial",
    "name": "Nike Mercurial",
    "colorway": "Rosa / Morado",
    "category": "deportivo",
    "price": 444000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/nike-mercurial-rosa-morado-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "nike-mercurial-gris-rosa",
    "brand": "Nike",
    "model": "Mercurial",
    "name": "Nike Mercurial",
    "colorway": "Gris / Rosa",
    "category": "deportivo",
    "price": 279000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/nike-mercurial-gris-rosa-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": false
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "nike-mercurial-menta-rosa-dorado",
    "brand": "Nike",
    "model": "Mercurial",
    "name": "Nike Mercurial",
    "colorway": "Menta / Rosa / Dorado",
    "category": "deportivo",
    "price": 549000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/nike-mercurial-menta-rosa-dorado-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": false
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "nike-mercurial-blanco-turquesa",
    "brand": "Nike",
    "model": "Mercurial",
    "name": "Nike Mercurial",
    "colorway": "Blanco / Turquesa",
    "category": "deportivo",
    "price": 234000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/nike-mercurial-blanco-turquesa-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": false
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "nike-mercurial-turquesa-rosa",
    "brand": "Nike",
    "model": "Mercurial",
    "name": "Nike Mercurial",
    "colorway": "Turquesa / Rosa",
    "category": "deportivo",
    "price": 264000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/nike-mercurial-turquesa-rosa-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "nike-mercurial-blanco-azul-rosa",
    "brand": "Nike",
    "model": "Mercurial",
    "name": "Nike Mercurial",
    "colorway": "Blanco / Azul / Rosa",
    "category": "deportivo",
    "price": 414000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/nike-mercurial-blanco-azul-rosa-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": false
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "nike-mercurial-blanco-azul",
    "brand": "Nike",
    "model": "Mercurial",
    "name": "Nike Mercurial",
    "colorway": "Blanco / Azul",
    "category": "deportivo",
    "price": 504000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/nike-mercurial-blanco-azul-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": false
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": false
      }
    ]
  },
  {
    "slug": "nike-mercurial-durazno-azul",
    "brand": "Nike",
    "model": "Mercurial",
    "name": "Nike Mercurial",
    "colorway": "Durazno / Azul",
    "category": "deportivo",
    "price": 474000,
    "description": "Técnica hasta el último detalle, cómoda desde el primer paso.",
    "images": [
      "/products/deportivo/nike-mercurial-durazno-azul-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": false
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": false
      }
    ]
  },
  {
    "slug": "nike-mercurial-rosa-durazno",
    "brand": "Nike",
    "model": "Mercurial",
    "name": "Nike Mercurial",
    "colorway": "Rosa / Durazno",
    "category": "deportivo",
    "price": 339000,
    "description": "Técnica hasta el último detalle, cómoda desde el primer paso.",
    "images": [
      "/products/deportivo/nike-mercurial-rosa-durazno-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": false
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": false
      }
    ]
  },
  {
    "slug": "on-cloud-menta-negro",
    "brand": "On",
    "model": "Cloud",
    "name": "On Cloud",
    "colorway": "Menta / Negro",
    "category": "deportivo",
    "price": 294000,
    "description": "Técnica hasta el último detalle, cómoda desde el primer paso.",
    "images": [
      "/products/deportivo/on-cloud-menta-negro-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": false
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": false
      }
    ]
  },
  {
    "slug": "on-cloud-azul-gris-lima",
    "brand": "On",
    "model": "Cloud",
    "name": "On Cloud",
    "colorway": "Azul / Gris / Lima",
    "category": "deportivo",
    "price": 489000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/on-cloud-azul-gris-lima-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "on-cloud-gris-naranja",
    "brand": "On",
    "model": "Cloud",
    "name": "On Cloud",
    "colorway": "Gris / Naranja",
    "category": "deportivo",
    "price": 354000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/on-cloud-gris-naranja-01.jpg",
      "/products/deportivo/on-cloud-gris-naranja-02.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "on-cloud-menta-blanco",
    "brand": "On",
    "model": "Cloud",
    "name": "On Cloud",
    "colorway": "Menta / Blanco",
    "category": "deportivo",
    "price": 504000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/on-cloud-menta-blanco-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": false
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "on-cloud-azul-gris-marino",
    "brand": "On",
    "model": "Cloud",
    "name": "On Cloud",
    "colorway": "Azul / Gris Marino",
    "category": "deportivo",
    "price": 414000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/on-cloud-azul-gris-marino-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": false
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": false
      }
    ]
  },
  {
    "slug": "on-cloud-marino-gris-lima",
    "brand": "On",
    "model": "Cloud",
    "name": "On Cloud",
    "colorway": "Marino / Gris / Lima",
    "category": "deportivo",
    "price": 429000,
    "description": "Técnica hasta el último detalle, cómoda desde el primer paso.",
    "images": [
      "/products/deportivo/on-cloud-marino-gris-lima-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": false
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "footshootermzl-street-blanco-menta",
    "brand": "footshootermzl",
    "model": "Street",
    "name": "footshootermzl Street",
    "colorway": "Blanco / Menta",
    "category": "urbano",
    "price": 324000,
    "description": "Silueta retro con carácter: la que combinas con todo y queda bien con nada que perder.",
    "images": [
      "/products/urbano/sneaker-blanco-menta-worn-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": false
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": false
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "balenciaga-triple-s-blanco",
    "brand": "Balenciaga",
    "model": "Triple S",
    "name": "Balenciaga Triple S",
    "colorway": "Blanco",
    "category": "urbano",
    "price": 309000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/balenciaga-triple-s-blanco-01.jpg",
      "/products/urbano/balenciaga-triple-s-blanco-02.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "on-cloud-trail-oliva-rosa",
    "brand": "On",
    "model": "Cloud Trail",
    "name": "On Cloud Trail",
    "colorway": "Oliva / Rosa",
    "category": "deportivo",
    "price": 549000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/on-cloud-trail-oliva-rosa-worn-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": false
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": false
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "nike-blazer-low-blanco",
    "brand": "Nike",
    "model": "Blazer Low",
    "name": "Nike Blazer Low",
    "colorway": "Blanco",
    "category": "casual",
    "price": 234000,
    "description": "Comodidad de sobra para cualquier plan, del café de la mañana a la salida de la noche.",
    "images": [
      "/products/casual/nike-blazer-low-blanco-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": false
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-adizero-atr-azul",
    "brand": "Adidas",
    "model": "Adizero ATR",
    "name": "Adidas Adizero ATR",
    "colorway": "Azul",
    "category": "deportivo",
    "price": 489000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/adidas-adizero-atr-azul-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-boost-runner-blanco-negro",
    "brand": "Adidas",
    "model": "Boost Runner",
    "name": "Adidas Boost Runner",
    "colorway": "Blanco / Negro",
    "category": "deportivo",
    "price": 354000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/adidas-boost-runner-blanco-negro-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-supernova-rojo-blanco",
    "brand": "Adidas",
    "model": "Supernova",
    "name": "Adidas Supernova",
    "colorway": "Rojo / Blanco",
    "category": "deportivo",
    "price": 504000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/adidas-supernova-rojo-blanco-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": false
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-hyperboost-blanco-verde",
    "brand": "Adidas",
    "model": "Hyperboost",
    "name": "Adidas Hyperboost",
    "colorway": "Blanco / Verde",
    "category": "deportivo",
    "price": 264000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/adidas-hyperboost-blanco-verde-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-adizero-evo-sl-plata-blanco",
    "brand": "Adidas",
    "model": "Adizero Evo SL",
    "name": "Adidas Adizero Evo SL",
    "colorway": "Plata / Blanco",
    "category": "deportivo",
    "price": 324000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/adidas-adizero-evo-plata-blanco-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": false
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-adizero-evo-sl-beige-crema",
    "brand": "Adidas",
    "model": "Adizero Evo SL",
    "name": "Adidas Adizero Evo SL",
    "colorway": "Beige / Crema",
    "category": "deportivo",
    "price": 459000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/adidas-adizero-evo-beige-crema-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": false
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": false
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-adizero-evo-sl-negro-naranja",
    "brand": "Adidas",
    "model": "Adizero Evo SL",
    "name": "Adidas Adizero Evo SL",
    "colorway": "Negro / Naranja",
    "category": "deportivo",
    "price": 489000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/adidas-adizero-evo-negro-naranja-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-adizero-evo-sl-negro-plata",
    "brand": "Adidas",
    "model": "Adizero Evo SL",
    "name": "Adidas Adizero Evo SL",
    "colorway": "Negro / Plata",
    "category": "deportivo",
    "price": 474000,
    "description": "Técnica hasta el último detalle, cómoda desde el primer paso.",
    "images": [
      "/products/deportivo/adidas-adizero-evo-negro-plata-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": false
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-adizero-evo-sl-rosa-dorado",
    "brand": "Adidas",
    "model": "Adizero Evo SL",
    "name": "Adidas Adizero Evo SL",
    "colorway": "Rosa / Dorado",
    "category": "deportivo",
    "price": 429000,
    "description": "Técnica hasta el último detalle, cómoda desde el primer paso.",
    "images": [
      "/products/deportivo/adidas-adizero-evo-rosa-dorado-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": false
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-adizero-evo-sl-atr-beige-rosa",
    "brand": "Adidas",
    "model": "Adizero Evo SL ATR",
    "name": "Adidas Adizero Evo SL ATR",
    "colorway": "Beige / Rosa",
    "category": "deportivo",
    "price": 264000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/adidas-adizero-atr-beige-rosa-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-adizero-evo-sl-atr-azul-marino",
    "brand": "Adidas",
    "model": "Adizero Evo SL ATR",
    "name": "Adidas Adizero Evo SL ATR",
    "colorway": "Azul Marino",
    "category": "deportivo",
    "price": 369000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/adidas-adizero-atr-azul-marino-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": false
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-adizero-evo-sl-atr-beige-naranja",
    "brand": "Adidas",
    "model": "Adizero Evo SL ATR",
    "name": "Adidas Adizero Evo SL ATR",
    "colorway": "Beige / Naranja",
    "category": "deportivo",
    "price": 264000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/adidas-adizero-atr-beige-naranja-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-repetitor-verde-blanco",
    "brand": "Adidas",
    "model": "Repetitor",
    "name": "Adidas Repetitor",
    "colorway": "Verde / Blanco",
    "category": "deportivo",
    "price": 519000,
    "description": "Técnica hasta el último detalle, cómoda desde el primer paso.",
    "images": [
      "/products/deportivo/adidas-repetitor-verde-blanco-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": false
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-repetitor-negro-gris",
    "brand": "Adidas",
    "model": "Repetitor",
    "name": "Adidas Repetitor",
    "colorway": "Negro / Gris",
    "category": "deportivo",
    "price": 534000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/adidas-repetitor-negro-gris-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-9060-crema-menta",
    "brand": "New Balance",
    "model": "9060",
    "name": "New Balance 9060",
    "colorway": "Crema / Menta",
    "category": "urbano",
    "price": 249000,
    "description": "De esas que cuentas por qué las compraste. Estilo urbano sin esfuerzo.",
    "images": [
      "/products/urbano/new-balance-9060-crema-menta-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": false
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": false
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-9060-crema-vino",
    "brand": "New Balance",
    "model": "9060",
    "name": "New Balance 9060",
    "colorway": "Crema / Vino",
    "category": "urbano",
    "price": 294000,
    "description": "De esas que cuentas por qué las compraste. Estilo urbano sin esfuerzo.",
    "images": [
      "/products/urbano/new-balance-9060-crema-vino-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": false
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-9060-cafe",
    "brand": "New Balance",
    "model": "9060",
    "name": "New Balance 9060",
    "colorway": "Café",
    "category": "urbano",
    "price": 504000,
    "description": "Silueta retro con carácter: la que combinas con todo y queda bien con nada que perder.",
    "images": [
      "/products/urbano/new-balance-9060-cafe-worn-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": false
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-9060-cafe-crema",
    "brand": "New Balance",
    "model": "9060",
    "name": "New Balance 9060",
    "colorway": "Café / Crema",
    "category": "urbano",
    "price": 339000,
    "description": "De esas que cuentas por qué las compraste. Estilo urbano sin esfuerzo.",
    "images": [
      "/products/urbano/new-balance-9060-cafe-crema-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": false
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-9060-gris",
    "brand": "New Balance",
    "model": "9060",
    "name": "New Balance 9060",
    "colorway": "Gris",
    "category": "urbano",
    "price": 264000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/new-balance-9060-gris-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-1906a-gris-menta",
    "brand": "New Balance",
    "model": "1906A",
    "name": "New Balance 1906A",
    "colorway": "Gris / Menta",
    "category": "deportivo",
    "price": 264000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/new-balance-1906a-gris-menta-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-9060-negro",
    "brand": "New Balance",
    "model": "9060",
    "name": "New Balance 9060",
    "colorway": "Negro",
    "category": "urbano",
    "price": 564000,
    "description": "De esas que cuentas por qué las compraste. Estilo urbano sin esfuerzo.",
    "images": [
      "/products/urbano/new-balance-9060-negro-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": false
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "amiri-runner-crema-cafe",
    "brand": "Amiri",
    "model": "Runner",
    "name": "Amiri Runner",
    "colorway": "Crema / Café",
    "category": "urbano",
    "price": 399000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/amiri-crema-cafe-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-wrpd-gris-azul",
    "brand": "New Balance",
    "model": "WRPD",
    "name": "New Balance WRPD",
    "colorway": "Gris / Azul",
    "category": "urbano",
    "price": 219000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/new-balance-wrpd-gris-azul-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "new-balance-fresh-foam-x-blanco-menta",
    "brand": "New Balance",
    "model": "Fresh Foam X",
    "name": "New Balance Fresh Foam X",
    "colorway": "Blanco / Menta",
    "category": "deportivo",
    "price": 234000,
    "description": "La combinación de peso ligero y soporte que necesitas para exigirte un poco más cada vez.",
    "images": [
      "/products/deportivo/new-balance-fresh-foam-blanco-menta-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": false
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-yeezy-700-estatico-gris",
    "brand": "Adidas",
    "model": "Yeezy 700",
    "name": "Adidas Yeezy 700",
    "colorway": "Estático Gris",
    "category": "urbano",
    "price": 309000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/adidas-yeezy-700-gris-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-adizero-adios-pro-negro-blanco",
    "brand": "Adidas",
    "model": "Adizero Adios Pro",
    "name": "Adidas Adizero Adios Pro",
    "colorway": "Negro / Blanco",
    "category": "deportivo",
    "price": 489000,
    "description": "Diseñada para rendir: amortiguación responsive y agarre que no te suelta en ningún ritmo.",
    "images": [
      "/products/deportivo/adidas-adizero-adios-pro-negro-blanco-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "under-armour-hovr-gris-negro",
    "brand": "Under Armour",
    "model": "HOVR",
    "name": "Under Armour HOVR",
    "colorway": "Gris / Negro",
    "category": "deportivo",
    "price": 564000,
    "description": "Técnica hasta el último detalle, cómoda desde el primer paso.",
    "images": [
      "/products/deportivo/under-armour-gris-negro-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": false
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-handball-spezial-benito-blanco-negro",
    "brand": "Adidas",
    "model": "Handball Spezial Benito",
    "name": "Adidas Handball Spezial Benito",
    "colorway": "Blanco / Negro",
    "category": "urbano",
    "price": 249000,
    "description": "De esas que cuentas por qué las compraste. Estilo urbano sin esfuerzo.",
    "images": [
      "/products/urbano/adidas-spezial-benito-blanco-negro-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": false
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": false
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "jordan-air-fusion-gris-rojo",
    "brand": "Jordan",
    "model": "Air Fusion",
    "name": "Jordan Air Fusion",
    "colorway": "Gris / Rojo",
    "category": "urbano",
    "price": 534000,
    "description": "Un ícono de calle que no pasa desapercibido — para andar con actitud propia.",
    "images": [
      "/products/urbano/jordan-chunky-gris-rojo-worn-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": true
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  },
  {
    "slug": "adidas-gazelle-indoor-x-bad-bunny-azul-san-juan",
    "brand": "Adidas",
    "model": "Gazelle Indoor x Bad Bunny",
    "name": "Adidas Gazelle Indoor x Bad Bunny",
    "colorway": "Azul San Juan",
    "category": "urbano",
    "price": 429000,
    "description": "De esas que cuentas por qué las compraste. Estilo urbano sin esfuerzo.",
    "images": [
      "/products/urbano/adidas-gazelle-bad-bunny-azul-01.jpg"
    ],
    "sizes": [
      {
        "size": 36,
        "available": true
      },
      {
        "size": 37,
        "available": true
      },
      {
        "size": 38,
        "available": true
      },
      {
        "size": 39,
        "available": true
      },
      {
        "size": 40,
        "available": true
      },
      {
        "size": 41,
        "available": true
      },
      {
        "size": 42,
        "available": false
      },
      {
        "size": 43,
        "available": true
      },
      {
        "size": 44,
        "available": true
      }
    ]
  }
];
