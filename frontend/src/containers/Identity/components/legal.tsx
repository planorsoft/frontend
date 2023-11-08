import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const usageAgreement = `
<p class="leading-7 [&:not(:first-child)]:mt-2">
    Bu Kullanım Sözleşmesi (&quot;Sözleşme&quot;), Planor tarafından
    sunulan ve kullanıcılar tarafından erişilen yazılım hizmetlerini
    düzenlemektedir. Bu Sözleşme&#39;yi kabul etmek ve Planor yazılımını
    kullanmak, aşağıda belirtilen şartlara ve koşullara bağlı olarak
    gerçekleşir:
</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">1. Hizmet Kullanımı</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    Planor yazılımını kullanarak, aşağıdaki şartları kabul etmiş
    olursunuz:
</p>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    a. Planor yazılımının kullanımı, yasalara ve düzenlemelere uygun
    olarak gerçekleştirilmelidir.
</p>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    b. Planor yazılımını kötü amaçlı kullanım, hizmetin güvenliğini
    tehlikeye atma, veri manipülasyonu veya başkalarının hizmet
    kullanımını engelleme amacıyla kullanmak kesinlikle yasaktır.
</p>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    c. Planor yazılımı ile ilgili tüm geliştirmeler, düzeltmeler ve
    güncellemeler Planor&#39;un mülkiyetindedir.
</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">2. Hizmetin İşleyişi</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    b. Planor, yazılımın işlevselliği ve performansı konusunda
    geliştirmeler yapabilir.
</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">3. Fiyatlandırma ve Ödeme</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    a. Planor yazılımını kullanımı için geçerli fiyatlandırma ve ödeme
    koşulları Planor&#39;un resmi{" "}
    <a href="https://planorsoft.com/pricing">web sitesinde</a>{" "}
    Fiyatlandırma menüsü altında belirtilmiştir.{" "}
</p>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    b. Planor yazılımının fiyatlarıyla ilgili tüm , düzeltmeler ve
    güncellemeler Planor&#39;un mülkiyetindedir.{" "}
</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">4. Gizlilik ve Veri Koruma</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    a. Planor, kullanıcı verilerini koruma konusunda ciddiyetle yaklaşır.
    Kullanıcı verileri, Gizlilik Sözleşmesi&#39;nde belirtilen
    politikalara uygun olarak işlenir ve korunur.
</p>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    b. Özel paket dışındaki paketlerde verileriniz bizde güvenle tutulur.
    Kullanılması, kiralanması veya satılması söz konusu dahi değildir.
    Özel paket içeriğine göre veritabanı kullanım şekli yapılacak olan
    anlaşmaya göre değişkenlik gösterebilir.
</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">5. İptal ve Sonlandırma</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    a. Kullanıcı, Planor yazılımını kullanmayı istediği zaman hesabını
    sonlandırabilir. Planor, hesap sonlandırma işlemini sağlamak için
    gereken süreyi belirler.
</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">6. Değişiklikler</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    Planor, bu kullanım sözleşmesini herhangi bir zamanda değiştirme
    hakkına sahiptir. Kullanıcılar bu değişikliklere uymakla
    yükümlüdürler.
</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">7. Son Hükümler</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
    Bu Sözleşme, Planor yazılımının kullanımı sırasında uygulanır. Bu
    Sözleşme&#39;nin ihlali, Planor&#39;un kullanıcıya hizmet sunma
    yetkisini sonlandırma hakkına yol açabilir.
</p>
`;

const privacyPolicy = `
<p class="leading-7 [&:not(:first-child)]:mt-2">
  Bu Gizlilik Sözleşmesi, Planor tarafından sunulan hizmetler sırasında
  kişisel verilerin nasıl toplandığını, işlendiğini ve korunduğunu
  açıklar. Bu Gizlilik Sözleşmesi, Planor yazılımını kullanan
  kullanıcılar için geçerlidir.
</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">1. Kişisel Verilerin Toplanması ve Kullanımı</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
  a. Planor, kullanıcıların kayıt sırasında sağladığı bilgileri toplar
  ve bu bilgileri kullanıcı hesaplarını yönetmek, hizmetleri sunmak ve
  iletişim kurmak için kullanır.
</p>
<p class="leading-7 [&:not(:first-child)]:mt-2">
  b. Planor, kullanıcı aktivitelerini ve etkileşimlerini sadece
  kullanıcı deneyimini artırabilmek amacıyla kullanabilir.
</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">2. Veri Paylaşımı</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
  a. Planor, kullanıcı verilerini üçüncü taraflarla paylaşmaz, satmaz
  veya kiralamaz.
</p>
<p class="leading-7 [&:not(:first-child)]:mt-2">b. Var olan verilerin hiçbirini başka amaçlarla kullanmaz.</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">3. Güvenlik</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
  a. Planor, kişisel verileri korumak için endüstri standardı güvenlik
  önlemleri alır.
</p>
<p class="leading-7 [&:not(:first-child)]:mt-2">b. Veri güvenliğinden kaynaklı özel önlemler alır.</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">4. Çerezler</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
  a. Planor, kullanıcı deneyimini geliştirmek ve hizmetlerini analiz
  etmek için çerezler kullanabilir.
</p>
<br/>
<h3 class="scroll-m-20 text-xl font-semibold tracking-tight mt-2">5. Değişiklikler ve İletişim</h3>
<p class="leading-7 [&:not(:first-child)]:mt-2">
  a. Planor, Gizlilik Sözleşmesi'ni değiştirme hakkına sahiptir.
  Kullanıcılara önemli değişiklikler hakkında bilgi verilecektir.
</p>
<p class="leading-7 [&:not(:first-child)]:mt-2">
  Bu kullanım sözleşmesi ve gizlilik sözleşmesi, Planor yazılımının
  kullanımı sırasında uyulması gereken temel kuralları ve veri koruma
  politikalarını açıklamaktadır. Kullanıcılar, Planor yazılımını
  kullanmaya başlamadan önce bu sözleşmeleri dikkatle okumalı ve kabul
  etmelidir.
</p>`;

interface LegalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "usage" | "privacy";
}

const Legal = ({ open, setOpen, type }: LegalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-screen m-2 md:w-6/12 overflow-auto h-full">
        <DialogHeader>
          <DialogTitle>
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {type === "usage" && "Kullanım Sözleşmesi"}
              {type === "privacy" && "Gizlilik Sözleşmesi"}
            </h1>
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div
            dangerouslySetInnerHTML={{
              __html: type === "usage" ? usageAgreement : privacyPolicy,
            }}
          />
        </div>
        <Button
          className="w-4/12 ml-auto"
          onClick={() => {
            setOpen(false);
          }}
        >
          Kapat
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Legal;
