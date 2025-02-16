import { ERegion, regionsByValue } from "@/data";

export default function Footer() {
  return (
    <footer className="p-4 bg-primary text-primary-foreground flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center gap-4">
        <div className="w-full flex flex-col gap-1">
          <div className="text-lg font-semibold">Službe za zapošljavanje:</div>
          <a href="https://usk-szz.ba/oglasi" target="blank">
            <p>{regionsByValue.get(ERegion.UNSKO_SANSKI_KANTON)?.label}</p>
          </a>
          <a
            href="https://www.facebook.com/Slu%C5%BEba-za-zapo%C5%A1ljavanje-USK-a-507371329352460/"
            target="blank"

          >
            <p>{regionsByValue.get(ERegion.UNSKO_SANSKI_KANTON)?.label} | Facebook</p>
          </a>
          <a
            href="http://www.szuzp.ba/nova-stranica-3.aspx"
            target="blank"

          >
            <p>{regionsByValue.get(ERegion.POSAVSKI_KANTON)?.label}</p>
          </a>
          <a href="https://szztk.ba/category/oglasi/" target="blank">
            <p>{regionsByValue.get(ERegion.TUZLANSKI_KANTON)?.label}</p>
          </a>
          <a href="http://zdk-szz.ba/searchadvert" target="blank">
            <p>{regionsByValue.get(ERegion.ZENICKO_DOBOJSKI_KANTON)?.label}</p>
          </a>
          <a href="https://szzbpk.ba/oglasikonkursi.html" target="blank">
            <p>{regionsByValue.get(ERegion.BOSANSKO_PODRINJSKI_KANTON)?.label}</p>
          </a>
          <a href="http://szzksbsbk.com.ba/oglasi-za-posao/" target="blank">
            <p>{regionsByValue.get(ERegion.SREDNJOBOSANSKI_KANTON)?.label}</p>
          </a>
          <a href="https://szzhnz-k.ba/natjecaji.php" target="blank">
            <p>{regionsByValue.get(ERegion.HERCEGOVACKO_NERETVANSKI_KANTON)?.label}</p>
          </a>
          <a href="http://szz-zzh.ba/category/oglasi/" target="blank">
            <p>{regionsByValue.get(ERegion.ZAPADNOHERCEGOVACKI_KANTON)?.label}</p>
          </a>
          <a href="https://szks.ba/posao/" target="blank">
            <p>{regionsByValue.get(ERegion.KANTON_SARAJEVO)?.label}</p>
          </a>
          <a href="http://zzzu-livno.ba/oglasi/page/1" target="blank">
            <p>{regionsByValue.get(ERegion.KANTON_10)?.label}</p>
          </a>
          <a
            href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=1"
            target="blank"

          >
            <p>{regionsByValue.get(ERegion.BANJALUCKA_REGIJA)?.label} | Banja Luka</p>
          </a>
          <a
            href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=5"
            target="blank"

          >
            <p>{regionsByValue.get(ERegion.BANJALUCKA_REGIJA)?.label} | Prijedor</p>
          </a>
          <a
            href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=2"
            target="blank"

          >
            <p>{regionsByValue.get(ERegion.DOBOJSKO_BIJELJINSKA_REGIJA)?.label} | Bijeljina</p>
          </a>
          <a
            href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=3"
            target="blank"

          >
            <p>{regionsByValue.get(ERegion.DOBOJSKO_BIJELJINSKA_REGIJA)?.label} | Doboj</p>
          </a>
          <a
            href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=4"
            target="blank"

          >
            <p>{regionsByValue.get(ERegion.SARAJEVSKO_ZVORNICKA_REGIJA)?.label} | Istočno Sarajevo</p>
          </a>
          <a
            href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=7"
            target="blank"

          >
            <p>{regionsByValue.get(ERegion.SARAJEVSKO_ZVORNICKA_REGIJA)?.label} | Zvornik</p>
          </a>
          <a
            href="http://www.zzzrs.net/index.php/nezaposleni/oglasi_zavoda/search&exact-filijala=6"
            target="blank"

          >
            <p>{regionsByValue.get(ERegion.TREBINJSKO_FOCANSKA_REGIJA)?.label}</p>
          </a>
          <a href="https://zzzbrcko.org/index.php/konkursi2016" target="blank">
            <p>{regionsByValue.get(ERegion.BRCKO_DISTRIKT)?.label}</p>
          </a>
        </div>

        <div className="md:items-end">
          <div className="flex flex-col text-lg font-semibold">
            <span>Kontakt:</span>
            <a href="mailto:joldic.hasan@gmail.com">joldic.hasan@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="mt-8 pb-2">
        <p className="text-center">
          Konkursi za zapošljavanje u javnim ustanovama i preduzećima u Bosni i Hercegovini
        </p>
      </div>
    </footer>
  );
};