import { render,finAllByRole,screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Toppings from "."
test("sosları ekleme ve çıkarma işleminin toplam fiyata etkisine ",async()=>{
    const user=userEvent.setup()

    // 1) bileseni renderla
    render(<Toppings/>)
    // butun sos checkbox larını al
    const toppings=await screen.findAllByRole("checkbox")
    // toplam span ı al
    const total=screen.getByTestId("total")
    // tüm checkbox ların tiksiz oldugunu kontrol et
    toppings.forEach((i)=>expect(i).not.toBeChecked())
    // toplam ücret 0 mı kontrol et
    expect(total.textContent).toBe("0")
    // soslardan birine tıkla
    await user.click(toppings[4])
    // toplam ücret 3 mü kontrol et
    expect(total.textContent).toBe("3")
    // farklı bir sos tikle
    await user.click(toppings[0])
    // toplam ücret 6 mı kontrol et
    expect(total.textContent).toBe("6")
    // soslardan birinin tikini kaldır
    await user.click(toppings[0])
    // toplam ücret 3 mü kontrol et
    expect(total.textContent).toBe("3")
    // soslardan diğerinin tikini kaldır
    await user.click(toppings[4])
    // toplam ücret 0 mı kontrol et

    expect(total.textContent).toBe("0")


})