class student {
    name: string
    gender: string
    age: number

    constructor(name: string, gender: string) {
        this.name = name
        this.gender = gender
    }

    setAge(age: number) {
        this.age = age
    }
    
    showInfo() {
        console.log(this.name, this.gender, this.age)
    }
}

const stu1 = new student('咯咯哒', 'female')
stu1.setAge(88)
stu1.showInfo()

export default {}