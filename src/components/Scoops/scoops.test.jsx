import { findAllByRole,  render, screen } from "@testing-library/react"
import Scoops from "."
import userEvent from "@testing-library/user-event"

/*
* ! Seçiciler
1) Method tipi | 2) all ifadesi | 3) seçici methodu

    * get > baslangıcta domda olan elementleri almak için kullanılır | elementi bulamazsa test başarısız olur.

    * query > elementin ekranda olma durumu kesin değilse kullanılır get ile benze calısır | elementi bulamazsa null döndürür test devam eder

    * find > elementin ne zaman basılacagı belli değilse (api istekleri) kullanılır. Not: promise döndürdüğünden async await ile calısır

    ** eğer metoda all ifadesi koyarsak seçiciye uyan bütün ifadeleri getirir
    * NOT : all kullanılırsa her zaman dönen cevap dizi olur.
 */
it("api dan alınan veriler için ekrana kartlar basılır",async()=>{
    render(<Scoops/>)

    // ekrana basılan kartları al
    const images=await screen.findAllByRole("img")

    // ekrandaki resimlerin sayısı birden fazla mı
    expect(images.length).toBeGreaterThanOrEqual(1)
})

it("Çeşitlerin ekleme ve azaltma özelliklerinin toplam fiyata etkisi",async ()=>{
    // userEvent in kurulumunu yap
    const user=userEvent.setup();
    // test edilecek bileşen render edilir
    render(<Scoops/>);
    // bütün ekle azalt buttonlarını çağır
    const addBtns=await screen.findAllByRole("button",{name:"Ekle"});
    const delBtns=await screen.findAllByRole("button",{name:"Çıkart"});
    // toplam fiyat elementini çağır
    const total=screen.getByTestId("total")
    // toplam fiyat 0 mı kontrol et
    expect(total).toHaveTextContent(/^0$/)
    //expect(total.textContent).toBe("0")


    // chocalate nin ekle butonuna tıkla
    await user.click(addBtns[2])
    // toplam fiyat 20 mi kontrol et
    expect(total.textContent).toBe("20")
    // vanilla nın ekle butonuna iki kez ekle
    await user.dblClick(addBtns[1])
    // toplam fiyat 60 mı diye kontrol et
    expect(total.textContent).toBe("60")
    // vanilla nın azalt butonuna tıkla
    await user.click(delBtns[1])
    // toplam fiyat 40 mı kontrol et
    expect(total.textContent).toBe("40")
    // vanilla nın azalt butonuna tıkla
    await user.click(delBtns[1])
    // toplam fiyat 20 mı kontrol et
    expect(total.textContent).toBe("20")
    // chocalate in azalt butonuna tıkla
    await user.click(delBtns[2])
    // toplam fiyat 0 mı kontrol et
    expect(total.textContent).toBe("0")
})