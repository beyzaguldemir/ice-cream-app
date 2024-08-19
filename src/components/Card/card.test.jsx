import { render, screen } from "@testing-library/react"
import Card from "."
import userEvent from "@testing-library/user-event"
// prop olarak gönderilecek örnek item
const item={
    id: "fd6e",
    imagePath: "/images/chocolate.png",
    name: "Chocolate",
}
// prop olarak veri alan bir bileşeni test ediyorsak bileşenin aldığı propları test ortamındada da göndermemiz gerekir.
test("miktar,başlık ve fotoğraf gelen propa göre ekrana basılır",()=>{
    render(<Card item={item} amount={3} addToBasket={()=>{}} removeFromBasket={()=>{}}/>)
    // miktar spanını cagır
    const amount=screen.getByTestId("amount")
    // span içeriği 3 mi kontrol et
    expect(amount.textContent).toBe("3")
    // choclate yazısı ekrana geldi mi kontrol et
    screen.getByText("Chocolate")
    // resim elementini çağır
    const image=screen.getByAltText("cesit-resim")
    // resmin kaynağı doğrumu kontrol et
    expect(image).toHaveAttribute("src","/images/chocolate.png")
})

// ekle ve azalt butonlarında çalışacak fonksiyonların testleri
test("Butonlara tıklanınca fonksiyonlar doğru parametre ile çalısır",async()=>{
    const user=userEvent.setup()
    // prop olarak gönderilen fonksiyonu test edeceksek jest aracılığı ile test (mock) edilebilir fonksiyonlar olustur
    const addMockFn=jest.fn();
    const removeMockFn=jest.fn();
    render(<Card item={item} amount={5} addToBasket={addMockFn} removeFromBasket={removeMockFn}/>);

    // butonları al
    const addBtn=screen.getByRole("button",{name:/ekle/i});
    const delBtn=screen.getByRole("button",{name:/çıkar/i})
    // ekle butonuna tıkla
    await user.click(addBtn)
    // addToBasket methodu doğru parametrelerle çağrıldı mı
    expect(addMockFn).toHaveBeenCalledWith(item);
    // azalt butonuna tıkla
    await user.click(delBtn)
    // removeFromBasket methodu dogru parametrelerle calısıyor mu
    expect(removeMockFn).toHaveBeenCalledWith(item.id);
})

// tododaki azalt butonun aktiflik testleri
describe("azalt butonu aktiflik testleri",()=>{
    it("miktar birden fazla ise button aktiftir",()=>{
        render(<Card item={item} amount={3}/>)
        const button =screen.getByRole("button",{name:"Çıkart"})
        expect(button).toBeEnabled()
    })
    it("miktar 0 ise button inaktiftir",()=>{
        render(<Card item={item} amount={0}/>)
        const button =screen.getByRole("button",{name:"Çıkart"})
        expect(button).toBeDisabled()
    })

})

