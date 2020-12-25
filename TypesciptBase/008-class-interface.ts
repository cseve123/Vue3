interface Radio {
    switchRadio(trigger: boolean): void
}
// 接口的继承
interface Battery extends Radio {
    checkBatteryStatus(): void
}
// 类的类型
class Car implements Radio {
    switchRadio(trigger: boolean) {}
}
class Cellphone implements Battery {
    switchRadio(trigger: boolean) {}
    checkBatteryStatus() {}
}