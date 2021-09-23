//  use: brings the library in scope
use std::io;
use std::cmp::Ordering;
use rand::Rng;
use colored::*;

fn main() {
    println!("Guess the number!");

    let secret = rand::thread_rng().gen_range(1, 101);

    println!("The secret number is: {}", secret);

    loop {
        println!("Please input your guess.");

        // mut: make variable mutable
        let mut guess = String::new(); // new returns an empty string
    
        // gives a handle to the standard input of current process
        io::stdin() 
        // reads the input and appends to the buffer (mutable reference to a string)
        // i.e. takes a reference of the string, modifies it but doesnt take the ownership
        // read_line returns the Result Type
        // pub enum Result<T,E> {
        //  Ok(T),
        //  Err(E),
        // }
            .read_line(&mut guess)
            .expect("Failed to read line");
    
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
    
        println!("You guessed: {}", guess);
    
        match guess.cmp(&secret) {
            Ordering::Less => println!("{}", "Too small!".red()),
            Ordering::Greater => println!("{}","Too big!".red()),
            Ordering::Equal => {
                println!("{}", "You win!".green());
                break;
            },
        }
    }
}       
