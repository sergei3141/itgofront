const exercise = 
  [ 
    {
      id:0,
      tag:'test',
      rank:'',
      onCodewars:'',
      tests:"console.log(function0(9,3));console.log(function0(-9,3));console.log(function0(9.99,0.01));console.log(function0(99,0));",
      testKeys:["12","-6","10","99"],
      defaultFunction: `function function0 (a, b) {}`,
      description: `Напишите функцию, которая принимает 2 аргумента и возвращает их сумму.
      
      function(9, 3) => 12
      function(-9, 3) => -6
      function(9.99, 0.01) => 10`,
    },{
      id:1,
      tag:'test',
      rank:'',
      onCodewars:'',
      tests:"console.log(function1());",
      testKeys:["Hello World!"],
      description: `Напишите функцию, которая возвращает строку "Hello World!".
      
      function() => Hello World!`,
    },{
      id:2,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function2(12));console.log(function2(33));console.log(function2(1));console.log(function2(10));console.log(function2(9))",
      testKeys:["Good afternoon!","Good afternoon!","Hello!","Good afternoon!", "Hello!"],
      description: `Напишите функцию, принимающую возраст и возвращающую ответ "Hello!", 
      если возраст меньше 10. В противном случае "Good afternoon!".
      
      function(12) => Good afternoon!
      function(33) => Good afternoon!
      function(1) => Hello!`,
    },{
      id:3,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function3(1,2));console.log(function3(33,2));console.log(function3(1,1));console.log(function3(0, -9));console.log(function3(9, -112))",
      testKeys:["2","33","is equal","0", "9"],
      description: `Напишите функцию, возвращающее большее из двух чисел и возвращающую строку 'is equal', 
      если числа равны.
      
      function(1,2) => 2
      function(33,2) => 33
      function(1,1) => is equal`,
    },{
      id:4,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function4(-5));console.log(function4(0));console.log(function4(1));console.log(function4(111));console.log(function4(1000))",
      testKeys:[true, true, false, false, true],
      description: `Напишите функцию, возвращающую true если число кратно 5 и false в противном случае. 
      Пусть в рамках данного задания 0 кратен любому числу
      
      function(-5) => true
      function(0) => true
      function(1) => false`,
    },{
      id:5,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function5(1));console.log(function5(33));console.log(function5(3));console.log(function5(0));console.log(function5(-33));console.log(function5(4))",
      testKeys:["a","e","c","e","e","d"],
      description: `Напишите функцию, принимающую число и возвращающую строку, согласно таблице ниже.

      1 => 'a',
      2 => 'b',
      3 => 'c',
      4 => 'd'

      и 'e' при любых других числах.
      
      function(1) => 'a'
      function(33) => 'e'
      function(3) => 'с'`,
    },{
      id:6,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function6(5, 5, '-'));console.log(function6(1.5, 6, '*'));console.log(function6(2, -1, '+'));console.log(function6(111, 3425, '+'));console.log(function6(1000, 0.5, '/'))",
      testKeys:[0, 9, 1, 3536, 2000],
      description: `Реализовать калькулятор. Пусть функция принимает первое число, второе число и знак (+, -, /, *)
      Возвращать функция должна результат операции.
      Тестирование не приводит к NaN!
      
      function(5, 5, "-") => 0
      function(1.5, 6, "*") => 9
      function(2, -1, "+") => 1`,
    },{
      id:7,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function7(5, 5));console.log(function7(10,20));console.log(function7(0.6,0.8));console.log(function7(0, 0));console.log(function7(12,12))",
      testKeys:[false, true, true, true, false],
      description: `Пусть функция принимает значение длины окружности и периметра квадрата.
      Возвращайте true, если окружность помещается в квадрат (не выходит за его пределы)
      и false в противном случае
      
      function(5, 5) => false
      function(10, 20) => true`,
    },{
      id:8,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function8(1.1));console.log(function8(12));console.log(function8(5.5));console.log(function8(-7.1))",
      testKeys:['toLower', 12, 'toUpper', 'toUpper'],
      description: `Напишите функцию, которая будет принимать одно числовое значение
      и возвращать 'toLower', 
      если при округлении до единиц, число будет меньше изначального
      и возвращать 'toUpper' в противном случае.

      Если число не изменится, возвращать число

      function(5.5) => 'toUpper'
      function(10) => 10
      function(1.1) => 'toLower'
      `,
    },{
      id:9,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function9(2022));console.log(function9(2020));console.log(function9(2016));console.log(function9(2012));console.log(function9(5555))",
      testKeys:[false, true, true, true, false],
      description: `Функция принимает год и возвращает true если он високосный. 
      В противном случае возвращает false
      
      function(2022) => false
      function(2020) => true`,
    },{
      id:10,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function10(5));console.log(function10(13));console.log(function10(100));console.log(function10(0));console.log(function10(40))",
      testKeys:[1, 2, -1, -1, 3],
      description: `В первом подъезде квартиры с 1 по 10. 
      Во втором с 11 по 24. В третьем с 25 по 40. Вопрос состоит вовсе не в том,
      что за архитектор проектировал этот дом, а в том, в каком подъезде находится
      принимаемая функцией квартира. 

      В случае отсутствия запрошенной квартиры возвращайте -1
      
      function(5) => 1
      function(100) => -1
      function(13) => 2`,
    },{
      id:11,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function11(1));console.log(function11(6));console.log(function11(5));console.log(function11(23))",
      testKeys:[0, 8, 5, 15],
      description: `Гипотеза Коллатца (также известная как гипотеза 3n + 1) - это гипотеза о том, 
      что, применяя следующий алгоритм к любому числу, мы всегда в конечном итоге достигнем единицы:
      
      если результат чётный, делим на 2
      в противном случае умножаем на 3 и прибавляем 1

      Ваша задача - создать функцию, которая принимает положительное значение n в качестве входных данных 
      и возвращает количество раз, которое вам нужно выполнить этот алгоритм, чтобы получить n = 1.

      function(1) => 0
      function(5) => 5  // 5 -> 16 -> 8 -> 4 -> 2 -> 1
      function(6) => 8  // 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1`,
    },{
      id:12,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function12(4, -12, 9));console.log(function12(1, 10, -39));console.log(function12(5, -9, -2));console.log(function12(9, -6, 1))",
      testKeys:[1.5, -13, -6, -0.2],
      description: `Напишите функцию, которая принимает три аргумента (a, b, c) 
      и возвращает наименьший корень квадратного уравнения вида ax^2 + bx + c = 0
      
      Возвращайте false если корни отсутствуют
      
      function(2, -9, 9) => 1.5 // 2x^2 - 9x + 9 = 0
      function(1, -12, 36) => 6 // 1x^2 - 12x + 36 = 0 `,
    },{
      id:13,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function13(3));console.log(function13(-1));console.log(function13(13))",
      testKeys:["Март", "Некорректный ввод", "Январь"],
      description: `Напишите функцию, которая принимает число и возвращает название месяца 
      на русском языке с большой буквы. Если число больше количества месяцев в году, начинайте 
      отсчёт оставшихся месяцев с начала года. Возвращаемое по дефолту значение "Некорректный ввод"
      
      function(2) => Февраль
      function(13) => Январь
      function(-1) => Некорректный ввод
      `,
    },{
      id:14,
      tag:'conditional',
      rank:'',
      onCodewars:'',
      tests:"console.log(function14(3, 5, 4));console.log(function14(4, 5, 3));console.log(function14(13, 4, 4));console.log(function14(143, 4, 44));console.log(function14(50, 30, 40))",
      testKeys:[true, true, false, false, true],
      description: `Золотым (или египетским, или Пифагоровым) треугольником называется 
      прямоугольный треугольник со сторонами, которые соотносятся друг с другом как 5:4:3.
      Пусть функция принимает три значения и возвращает true, если треугольник является золотым.
      В противном случае false. 

      P.S будьте внимательны, треугольник со сторонами 4:5:3 тоже золотой!

      function(5, 4, 3) => true
      function(30, 3, 5) => false
      function(-1, 5, 4) => false
      `,
    }
  ]

  export default exercise