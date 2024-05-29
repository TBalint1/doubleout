# Az alkalmazás témája:

Az általam készített alkalmazás célja, egy olyan darts-os webalkalmazás létrehozása,
amellyel saját versenyeket tudunk létrehozni a tetszésünk szerinti beállításokkal. A mérkőzések adatait a játékosok rögzítik egy pontszámláló segítségével, lehetőleg a mérkőzés valós lejátszásával párhuzamosan. Az oldal ezekből az adatokból állít elő statisztikákat a mérkőzésekről, a játékosokról és a versenyekről. A versenyek létrehozása és a versenyek lejátszása mellett lehetőségünk van a nyilvántartott eredmények és statisztikák megtekintésére. A statisztikák több szempont szerint is megtekinthetők, ugyanis kiszámításra kerülnek a mérkőzések, a játékosok, és a versenyek estében is. Emellett a felhasználóknak lehetőségük van saját profilt is létrehozni regisztrációval, amibe később be is jelentkezhetnek.

# Az oldalak bemutatása:

Az alkalmazás több oldalból áll, de természetesen az oldalak között egyszerű az átjárhatóság. Ez a fejlécnek is köszönhető ahol, a menüpontokban az összes oldal megtalálható és a fejléc természetesen minden oldalon elérhető.

Az oldal emblémájára kattintva érhetjük el a kezdő oldalt, mellette pedig menüpontokban szerepelnek a felhasználói adatlap, a játékosok, és a versenyek oldalaira irányító gombok. A versenyek a játékosok és a mérkőzések külön adatlapokat kaptak, amelyek szintén külön oldalon érhetőek el.

## Kezdő oldal:

A kezdő oldallal egyből az alkalmazás megnyitásakor találkozunk, itt jelennek meg a még folyamatban lévő versenyek külön blokkokban. A blokkban látható a verseny neve, ez alatt kiírásra kerül még, hogy jelenleg milyen fázisban jár, és a mellette található „Continue” gombbal az adatlapjára ugrunk, ahonnan folytatni tudjuk a versenyt a hátralévő mérkőzések lejátszásával.

Amennyiben a felhasználó nem indított még versenyt vagy csak éppen nincsen lezáratlan versenye, akkor ezek a blokkok nem jelennek meg. Azonban a kezdő oldalon megtalálható „+ New Tournament” gomb megnyomásával tudunk változtatni ezen az állapoton egy új torna létrehozásával. Itt minden szükséges adat kitöltésével létrehozható a torna, amely lezárásáig a korábban leírt módon már meg fog jelenni a kezdő oldalon is.

## Versenyek oldala:

A versenyek oldalán tekinthetjük meg a még zajló és a már lezárult versenyeket is. A különböző versenyek külön blokkokban jelennek meg, ezek a blokkok pedig a versenyek egyes alapvető adatait tartalmazzák, mint például a nevüket és a verseny aktuális állapotát. Az itt megtalálható „Continue” gombra kattintva az oldal tovább irányít minket a kiválasztott verseny adatlapjára.

## Verseny oldal:

A verseny oldalon a kiválasztott verseny adatlapját tekinthetjük meg. Az adatlap tartalmazza a verseny mérkőzéseit és a verseny összesített statisztikáját. A mérkőzéseken keresztül tovább tudunk lépni a kiválasztott mérkőzés oldalára.

## Verseny létrehozása oldal:

A verseny létrehozása oldalán van lehetőségünk egy új verseny létrehozására. Ehhez az adatok kitöltése szükséges, ami a verseny típusát határozza meg, ezt követően az „Add Players” gombbal tudunk játékosokat hozzáadni a versenyhez. Miután a minden szükséges adatot megfelelően kitöltöttünk a „Create Tournament” gombra kattintva létrehozzuk a versenyt.

## Játékosok oldala:

A játékosok oldalán az alkalmazásban létrehozott versenyeken résztvevő játékosok találhatók meg, illetve a neveik alapján lehetőség van keresni is közöttük. Egy adott játékost kiválasztva a játékos adatlapját tudjuk elérni egy új oldalon.

## Játékos oldal:

Minden játékos saját adatlappal rendelkezik, ahol az adott játékos statisztikáit tudjuk megtekinteni a már korábban is leírt szempontok szerint.
Emellett megtekinthetőek a játékos által lejátszott mérkőzések eredményei is.

## Mérkőzések oldal:

A mérkőzés oldal tartalmazza a játékhoz szükséges pont kalkulátort amelybe a dobott pontokat tudjuk beírni az eltalált szektor és a szektoron belül eltalált terület megadásával, ami alapján kiszámításra kerül a dobás értéke, ami a játék szabályai alapján kivonódik a játékos pontjaiból és ez a folyamat addig ismétlődik, amíg valamelyik játékos meg nem nyeri a mérkőzést. A játékosok nevei mellett látható a mérkőzés eddigi eredménye, valamint az aktuális legen belüli pontszámaik.

Ezekből a megadott adatokból kerülnek kiszámításra a statisztikák, amelyeket szintén ezen az oldalon tekinthetünk meg, középen a statisztikai szempontokkal, a két szélén pedig a két játékos statisztikáival.

## Bejelentkezési oldal:

A bejelentkezési oldalon a korábban már regisztrált felhasználók tudnak bejelentkezni az e-mail címük és a jelszavuk megadásával.

## Regisztrációs oldal:

A regisztrációs oldalon azon felhasználók regisztrálhatnak, akik korábban még nem tették meg. Itt egy felhasználónév, e-mail cím, és egy jelszó megadása szükséges a sikeres regisztrációhoz.


# Az alkalmazás használata:

A program indítása Visual Studio Code-ból lehetséges és a Node.js telepítése szükséges hozzá. Ehhez elsősorban klónozzuk le a repository-t is nyissuk meg a Visual Studio Code-ban.

Nyissunk meg egy új terminált és navigáljunk a backend mappába.

```bash
cd backend
```
Telepítsük az express-t.

```bash
npm install express cors
```

Indítsuk el a szervert.

```bash
npm start
```

A következős lépésben nyissunk meg egy új terminált és navigáljunk a frontend mappába.

```bash
cd frontend
```

Miután beléptünk a mappába indítsuk el a programot az alábbi paranccsal.

```bash
ng serve -o
```

Ezen lépések követésével a program a böngészőben fog elindulni a http://localhost:4200/ címen.
