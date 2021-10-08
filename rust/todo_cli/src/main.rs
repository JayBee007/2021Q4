use std::str::FromStr;
use std::io::Read;
use std::env::args;
use std::collections::HashMap;

#[derive(Debug)]
struct Todo {
    map: HashMap<String, bool>,
}

impl Todo {
    fn complete(&mut self, key: &String) -> Option<()> {
        match self.map.get_mut(key){
            Some(v) => Some(*v = false),
            None => None,
        }
    }
    fn insert(&mut self, key: String) {
        self.map.insert(key, true);
    }

    fn save(self) -> Result<(), std::io::Error> {
        let mut content = String::new();

        for (key, val) in self.map {
            let record = format!("{}\t{}\n", key, val);
            content.push_str(&record)
        }
        std::fs::write("db.txt", content)
    }

    fn new() -> Result<Todo, std::io::Error> {
        let mut file = std::fs::OpenOptions::new()
                        .write(true)
                        .create(true)
                        .read(true).
                        open("db.txt")?;
        
        let mut content = String::new();

        file.read_to_string(&mut content)?;

        let map: HashMap<String, bool> = content
            .lines()
            .map(|line| line.splitn(2, '\t').collect::<Vec<&str>>())
            .map(|v| (v[0], v[1]))
            .map(|(k, v)| (String::from(k), bool::from_str(v).unwrap()))
            .collect();

        Ok(Todo { map })
                                            
    }
}

fn main() {
    
    // std::env::args()  is a function brought in from the env module of the standard libray
    // that returns the arguments that the program was started with. Since it's an iterator
    // we can access the value stored at each position with the nth() function. The Argument
    // at position 0 is the program itself, which is why we start reading from the 1st
    // element.



    let action = args().nth(1).expect("Please specify an action");
    
    let item = args().nth(2).expect("Please specify an item");
    

    let mut todo = Todo::new().expect("Initialization of db failed");

    
    if action == "add" {
        todo.insert(item);

        match todo.save() {
            Ok(_) => println!("todo saved"),
            Err(err) => println!("An error occured: {}", err)
        }
    }else if action == "complete" {
        match todo.complete(&item) {
            None => println!("{} is not present in the list", item),
            Some(_) => match todo.save() {
                Ok(_) => println!("Todo completed"),
                Err(err) => println!("An error occured: {}", err)
            }
        }
    }
    
}
