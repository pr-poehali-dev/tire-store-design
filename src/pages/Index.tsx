import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const TIRE_IMG = 'https://cdn.poehali.dev/projects/64097697-4d75-48c3-bd28-7c18cc4318b4/files/69b16e74-5870-4f8b-9b89-0dbac3db6607.jpg';
const WHEEL_IMG = 'https://cdn.poehali.dev/projects/64097697-4d75-48c3-bd28-7c18cc4318b4/files/95d84583-e31f-4417-922b-66134290b454.jpg';
const HERO_IMG = 'https://cdn.poehali.dev/projects/64097697-4d75-48c3-bd28-7c18cc4318b4/files/2d63a5a6-2eaf-4c29-aa87-2eac19bf2ab7.jpg';

interface Product {
  id: number;
  name: string;
  brand: string;
  size: string;
  diameter: number;
  season: 'Лето' | 'Зима' | 'Всесезон';
  type: 'Шины' | 'Диски';
  price: number;
  img: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Pilot Sport 4', brand: 'Michelin', size: '225/45 R17', diameter: 17, season: 'Лето', type: 'Шины', price: 12400, img: TIRE_IMG },
  { id: 2, name: 'Blizzak Ice', brand: 'Bridgestone', size: '205/55 R16', diameter: 16, season: 'Зима', type: 'Шины', price: 9800, img: TIRE_IMG },
  { id: 3, name: 'ContiCross 5', brand: 'Continental', size: '235/60 R18', diameter: 18, season: 'Всесезон', type: 'Шины', price: 15600, img: TIRE_IMG },
  { id: 4, name: 'Forge Sport', brand: 'Replica', size: '7.5J R17', diameter: 17, season: 'Всесезон', type: 'Диски', price: 8900, img: WHEEL_IMG },
  { id: 5, name: 'P Zero Winter', brand: 'Pirelli', size: '245/40 R19', diameter: 19, season: 'Зима', type: 'Шины', price: 18200, img: TIRE_IMG },
  { id: 6, name: 'Turismo R18', brand: 'Vossen', size: '8.0J R18', diameter: 18, season: 'Всесезон', type: 'Диски', price: 14300, img: WHEEL_IMG },
  { id: 7, name: 'Energy Saver', brand: 'Michelin', size: '195/65 R15', diameter: 15, season: 'Лето', type: 'Шины', price: 7200, img: TIRE_IMG },
  { id: 8, name: 'Hakka 10', brand: 'Nokian', size: '215/55 R17', diameter: 17, season: 'Зима', type: 'Шины', price: 11500, img: TIRE_IMG },
  { id: 9, name: 'Sport Mono', brand: 'BBS', size: '8.5J R19', diameter: 19, season: 'Всесезон', type: 'Диски', price: 22000, img: WHEEL_IMG },
];

const BRANDS = ['Michelin', 'Bridgestone', 'Continental', 'Pirelli', 'Nokian', 'Replica', 'Vossen', 'BBS'];
const SEASONS = ['Лето', 'Зима', 'Всесезон'];
const TYPES = ['Шины', 'Диски'];
const DIAMETERS = [15, 16, 17, 18, 19];

const SERVICES = [
  { icon: 'CircleCheck', title: 'Новые и б/у шины', desc: 'Гарантируем, что б/у шины прошли полную проверку: без боковых порезов, грыж и неравномерного износа, полностью пригодны к эксплуатации.' },
  { icon: 'Repeat', title: 'Выкуп, обмен и трейд-ин', desc: 'Выкупаем шины с пробегом у физических и юридических лиц в любых количествах. Деньги выплачиваем сразу, при необходимости приедем к вам.' },
  { icon: 'Wrench', title: 'Шинсервис', desc: 'Монтаж, 3D балансировка, аргонная сварка, правка дисков, азот, ремонт боковых порезов и грыж.' },
  { icon: 'Bolt', title: 'Крепёж', desc: 'Продаём гайки, болты, вентиля и проставки для вашего автомобиля.' },
  { icon: 'Warehouse', title: 'Сезонное хранение шин', desc: 'Безопасное хранение вашего комплекта на складе — от 200 руб./месяц.' },
  { icon: 'SprayCan', title: 'Порошковая покраска дисков', desc: 'Качественная порошковая покраска литых и стальных дисков в любой цвет.' },
  { icon: 'Snowflake', title: 'Экспресс заправка кондиционеров', desc: 'Быстрая заправка и обслуживание автомобильных кондиционеров.' },
];

const BUYOUT_PRICES = [
  { r: 'R15', price: 'до 1 500 ₽' },
  { r: 'R16', price: 'до 2 500 ₽' },
  { r: 'R17', price: 'до 3 000 ₽' },
  { r: 'R18', price: 'до 4 000 ₽' },
  { r: 'R19', price: 'до 4 500 ₽' },
  { r: 'R20–R24', price: 'до 5 000 ₽' },
];

const BUYOUT_REQUIREMENTS = [
  'С протектором более 4,5 миллиметра',
  'С равномерным износом — без стёртых боков',
  'Без дефектов — боковых порезов и грыж',
  'Шинам должно быть меньше 5 лет',
];

const BUYOUT_ADVANTAGES = [
  'Не нужно размещать объявления и долго ждать покупателя, отвечая на бесконечные звонки.',
  'Выкуп колёс происходит в течение часа, включая оценку.',
  'Опытные оценщики честно и прозрачно производят оценку, озвучивая основные факторы стоимости.',
  'Деньги вы получаете сразу же после достижения договорённости по стоимости колёс.',
  'Работаем без выходных и готовы приобрести колёса в сборе, старую резину или диски.',
];

const REVIEWS = [
  { name: 'Алексей М.', car: 'BMW X5', text: 'Заказывал зимний комплект — привезли в срок, поставили быстро. Цены адекватные, менеджеры разбираются в вопросе.', rating: 5 },
  { name: 'Ирина С.', car: 'Toyota Camry', text: 'Большой выбор, помогли подобрать диски под мою машину. Шиномонтаж сделали аккуратно. Рекомендую!', rating: 5 },
  { name: 'Дмитрий К.', car: 'Audi A6', text: 'Брал летнюю резину Michelin. Всё оригинал, с гарантией. Сделали развал-схождение тут же. Доволен сервисом.', rating: 5 },
];

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'services', label: 'Услуги' },
  { id: 'buyout', label: 'Выкуп колёс' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

const Index = () => {
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [selSeasons, setSelSeasons] = useState<string[]>([]);
  const [selTypes, setSelTypes] = useState<string[]>([]);
  const [selDiameter, setSelDiameter] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([25000]);

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selBrands.length && !selBrands.includes(p.brand)) return false;
      if (selSeasons.length && !selSeasons.includes(p.season)) return false;
      if (selTypes.length && !selTypes.includes(p.type)) return false;
      if (selDiameter && p.diameter !== selDiameter) return false;
      if (p.price > priceRange[0]) return false;
      return true;
    });
  }, [selBrands, selSeasons, selTypes, selDiameter, priceRange]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.product.id !== id));
  const changeQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((i) => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  const resetFilters = () => {
    setSelBrands([]); setSelSeasons([]); setSelTypes([]); setSelDiameter(null); setPriceRange([25000]);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const fmt = (n: number) => n.toLocaleString('ru-RU');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground border-b-2 border-accent">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border-4 border-accent flex items-center justify-center bg-primary">
              <Icon name="Disc" className="text-accent" size={22} />
            </div>
            <div className="text-left leading-none">
              <div className="font-heading font-bold text-lg md:text-2xl tracking-wider">#АСТ_ШИНА</div>
              <div className="text-[10px] md:text-xs text-accent tracking-[0.2em] uppercase">Шины · Диски · Сервис</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="font-heading uppercase text-sm tracking-wide hover:text-accent transition-colors">
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+79276643340" className="hidden md:flex items-center gap-2 hover:text-accent transition-colors">
              <Icon name="Phone" size={18} />
              <span className="font-heading text-sm">+7 (927) 664-33-40</span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative bg-accent text-accent-foreground border-accent hover:bg-accent/90 hover:text-accent-foreground">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center border border-accent">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                  <SheetTitle className="font-heading text-2xl uppercase tracking-wide flex items-center gap-2">
                    <Icon name="ShoppingCart" size={24} /> Корзина
                  </SheetTitle>
                </SheetHeader>
                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3">
                    <Icon name="PackageOpen" size={56} className="opacity-40" />
                    <p>Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto py-4 space-y-3">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex gap-3 border border-border rounded p-3 bg-card">
                          <img src={item.product.img} alt={item.product.name} className="w-16 h-16 object-cover rounded bg-primary" />
                          <div className="flex-1 min-w-0">
                            <div className="font-heading font-semibold truncate">{item.product.brand} {item.product.name}</div>
                            <div className="text-xs text-muted-foreground">{item.product.size}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => changeQty(item.product.id, -1)} className="w-6 h-6 border border-border rounded flex items-center justify-center hover:bg-secondary">
                                <Icon name="Minus" size={14} />
                              </button>
                              <span className="w-6 text-center text-sm">{item.qty}</span>
                              <button onClick={() => changeQty(item.product.id, 1)} className="w-6 h-6 border border-border rounded flex items-center justify-center hover:bg-secondary">
                                <Icon name="Plus" size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive">
                              <Icon name="X" size={18} />
                            </button>
                            <div className="font-heading font-semibold whitespace-nowrap">{fmt(item.product.price * item.qty)} ₽</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-4 space-y-3">
                      <div className="flex justify-between font-heading text-xl">
                        <span>Итого:</span>
                        <span>{fmt(cartTotal)} ₽</span>
                      </div>
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading uppercase tracking-wide h-12">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40" />
        </div>
        <div className="container relative py-20 md:py-32">
          <div className="max-w-2xl animate-fade-in">
            <Badge className="bg-accent text-accent-foreground hover:bg-accent mb-5 font-heading uppercase tracking-widest">
              Гарантия качества
            </Badge>
            <h1 className="font-heading font-bold text-4xl md:text-6xl uppercase leading-tight tracking-wide mb-6">
              Шины и диски<br />в <span className="text-accent">Астрахани</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
              Новые и б/у шины с гарантией, выкуп и обмен колёс, профессиональный шинсервис. Подберём оптимальный комплект и установим за один день.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => scrollTo('catalog')} className="bg-accent text-accent-foreground hover:bg-accent/90 font-heading uppercase tracking-wide px-8 text-base h-12">
                Перейти в каталог
              </Button>
              <Button onClick={() => scrollTo('services')} variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary font-heading uppercase tracking-wide h-12 px-8 text-base">
                Наши услуги
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 mt-12">
              {[['Truck', 'Доставка по городу'], ['ShieldCheck', 'Гарантия качества'], ['Tag', 'Лучшие цены']].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon name={icon} className="text-accent" size={22} />
                  <span className="text-sm font-heading uppercase tracking-wide">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10">
            <div className="text-accent font-heading uppercase tracking-widest text-sm mb-2">Каталог товаров</div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-wide">Подберите комплект</h2>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Filters */}
            <aside className="bg-card border border-border rounded-lg p-6 h-fit lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-semibold text-xl uppercase flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={20} /> Фильтры
                </h3>
                <button onClick={resetFilters} className="text-xs text-muted-foreground hover:text-foreground underline">
                  Сбросить
                </button>
              </div>

              <FilterGroup title="Тип">
                {TYPES.map((t) => (
                  <Chip key={t} active={selTypes.includes(t)} onClick={() => toggle(selTypes, setSelTypes, t)}>{t}</Chip>
                ))}
              </FilterGroup>

              <FilterGroup title="Сезон">
                {SEASONS.map((s) => (
                  <Chip key={s} active={selSeasons.includes(s)} onClick={() => toggle(selSeasons, setSelSeasons, s)}>{s}</Chip>
                ))}
              </FilterGroup>

              <FilterGroup title="Диаметр (R)">
                {DIAMETERS.map((d) => (
                  <Chip key={d} active={selDiameter === d} onClick={() => setSelDiameter(selDiameter === d ? null : d)}>R{d}</Chip>
                ))}
              </FilterGroup>

              <FilterGroup title="Бренд">
                {BRANDS.map((b) => (
                  <Chip key={b} active={selBrands.includes(b)} onClick={() => toggle(selBrands, setSelBrands, b)}>{b}</Chip>
                ))}
              </FilterGroup>

              <div className="mb-2">
                <div className="font-heading uppercase text-sm tracking-wide text-muted-foreground mb-3">Цена до</div>
                <Slider value={priceRange} onValueChange={setPriceRange} min={5000} max={25000} step={500} />
                <div className="text-right font-heading text-foreground mt-2 font-semibold">{fmt(priceRange[0])} ₽</div>
              </div>
            </aside>

            {/* Products */}
            <div>
              <div className="text-sm text-muted-foreground mb-4">Найдено товаров: <span className="font-semibold text-foreground">{filtered.length}</span></div>
              {filtered.length === 0 ? (
                <div className="border border-dashed border-border rounded-lg py-20 text-center text-muted-foreground">
                  <Icon name="SearchX" size={48} className="mx-auto mb-3 opacity-40" />
                  <p>По вашим фильтрам ничего не найдено</p>
                  <Button onClick={resetFilters} variant="outline" className="mt-4">Сбросить фильтры</Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((p) => (
                    <div key={p.id} className="group bg-card border border-border rounded-lg overflow-hidden hover:border-accent hover:shadow-lg transition-all animate-scale-in">
                      <div className="relative aspect-square bg-primary overflow-hidden">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground hover:bg-accent font-heading uppercase text-xs">{p.season}</Badge>
                        <Badge className="absolute top-3 right-3 bg-primary/80 text-primary-foreground hover:bg-primary font-heading uppercase text-xs">{p.type}</Badge>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground font-heading uppercase tracking-wide">{p.brand}</div>
                        <div className="font-heading font-semibold text-lg leading-tight">{p.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Icon name="Ruler" size={14} /> {p.size}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="font-heading font-bold text-2xl">{fmt(p.price)} ₽</div>
                          <Button onClick={() => addToCart(p)} size="sm" className="bg-primary hover:bg-accent hover:text-accent-foreground font-heading uppercase tracking-wide transition-colors">
                            <Icon name="Plus" size={16} className="mr-1" /> В корзину
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="mb-10">
            <div className="text-foreground/60 font-heading uppercase tracking-widest text-sm mb-2">Что мы предлагаем</div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-wide">Услуги сервиса</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-card border border-border rounded-lg p-6 hover:border-accent hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded bg-primary flex items-center justify-center mb-4">
                  <Icon name={s.icon} className="text-accent" size={28} />
                </div>
                <h3 className="font-heading font-semibold text-xl uppercase mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyout */}
      <section id="buyout" className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="mb-10">
            <div className="text-accent font-heading uppercase tracking-widest text-sm mb-2">Продайте нам колёса</div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-wide">Выкуп колёс</h2>
            <p className="text-primary-foreground/70 mt-4 max-w-2xl">
              #АСТ_ШИНА занимается выкупом шин и колёс легковых автомобилей и мотошин. Привозите колёса сегодня — оценим и рассчитаемся сразу.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-semibold text-xl uppercase mb-4 flex items-center gap-2">
                  <Icon name="ClipboardCheck" className="text-accent" size={22} /> Какие колёса выкупаем
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {BUYOUT_REQUIREMENTS.map((req) => (
                    <div key={req} className="flex items-start gap-3 bg-primary-foreground/5 border border-primary-foreground/10 rounded p-4">
                      <Icon name="Check" className="text-accent shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-primary-foreground/85">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-xl uppercase mb-4 flex items-center gap-2">
                  <Icon name="Star" className="text-accent" size={22} /> 5 преимуществ скупки у нас
                </h3>
                <div className="space-y-3">
                  {BUYOUT_ADVANTAGES.map((adv, i) => (
                    <div key={i} className="flex items-start gap-4 bg-primary-foreground/5 border border-primary-foreground/10 rounded p-4">
                      <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground font-heading font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-sm text-primary-foreground/85 leading-relaxed">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-lg overflow-hidden lg:sticky lg:top-24">
              <div className="bg-accent text-accent-foreground p-5">
                <h3 className="font-heading font-bold text-2xl uppercase flex items-center gap-2">
                  <Icon name="BadgeRussianRuble" size={26} /> Цены на скупку
                </h3>
              </div>
              <div className="divide-y divide-border">
                {BUYOUT_PRICES.map((p) => (
                  <div key={p.r} className="flex items-center justify-between px-5 py-4">
                    <span className="font-heading font-semibold text-lg">{p.r}</span>
                    <span className="font-heading font-bold text-lg text-foreground">{p.price}</span>
                  </div>
                ))}
              </div>
              <div className="p-5">
                <Button onClick={() => scrollTo('contacts')} className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-heading uppercase tracking-wide h-12 transition-colors">
                  Сдать колёса
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10">
            <div className="text-foreground/60 font-heading uppercase tracking-widest text-sm mb-2">Нам доверяют</div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-wide">Отзывы клиентов</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-card border border-border rounded-lg p-6 relative">
                <Icon name="Quote" className="text-accent absolute top-6 right-6 opacity-20" size={40} />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" className="text-accent fill-accent" size={18} />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-5">«{r.text}»</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-semibold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-heading font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.car}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts + Feedback */}
      <section id="contacts" className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="text-accent font-heading uppercase tracking-widest text-sm mb-2">Свяжитесь с нами</div>
              <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-wide mb-8">Контакты</h2>
              <div className="space-y-5">
                {[
                  { icon: 'MapPin', label: 'Адрес', val: 'г. Астрахань, ул. Рождественского, 35' },
                  { icon: 'Phone', label: 'Телефон', val: '+7 (927) 664-33-40' },
                  { icon: 'Mail', label: 'Email', val: 'ast_shina@bk.ru' },
                  { icon: 'Truck', label: 'Доставка', val: 'Только по городу' },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded border-2 border-accent flex items-center justify-center shrink-0">
                      <Icon name={c.icon} className="text-accent" size={22} />
                    </div>
                    <div>
                      <div className="text-sm text-primary-foreground/60 font-heading uppercase tracking-wide">{c.label}</div>
                      <div className="text-lg font-heading">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-lg p-6 md:p-8">
              <h3 className="font-heading font-semibold text-2xl uppercase mb-1">Обратная связь</h3>
              <p className="text-sm text-muted-foreground mb-6">Оставьте заявку — мы перезвоним в течение 15 минут</p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="Ваше имя" className="h-12" />
                <Input placeholder="Телефон" type="tel" className="h-12" />
                <Textarea placeholder="Сообщение (марка авто, размер шин и т.д.)" rows={4} />
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading uppercase tracking-wide h-12">
                  Отправить заявку
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Disc" className="text-accent" size={24} />
            <span className="font-heading font-bold text-xl tracking-wider">#АСТ_ШИНА</span>
          </div>
          <div className="text-sm text-primary-foreground/60">© 2026 #АСТ_ШИНА, Астрахань. Все права защищены.</div>
          <div className="flex gap-3">
            {['Send', 'MessageCircle', 'Phone'].map((i) => (
              <button key={i} className="w-10 h-10 rounded border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                <Icon name={i} size={18} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

const FilterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <div className="font-heading uppercase text-sm tracking-wide text-muted-foreground mb-3">{title}</div>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded text-sm font-heading transition-colors border ${
      active
        ? 'bg-accent text-accent-foreground border-accent'
        : 'bg-secondary text-secondary-foreground border-border hover:border-accent'
    }`}
  >
    {children}
  </button>
);

export default Index;