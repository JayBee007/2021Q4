// https://adventofcode.com/2021/day/1

use std::{
    fs::File,
    io::{prelude::*, BufReader}
};

fn lines_to_vec() -> Vec<u32>{
    let path = "input.txt";
    let file = File::open(path).expect("No file found");
    let buf = BufReader::new(file);
    buf.lines()
        .map(|line| line.unwrap())
        .map(|l| l.parse::<u32>().unwrap())
        .collect()
}

fn main() {
    let depths = lines_to_vec();

    let mut counter = 0;

    let vec_len = depths.len();

    for (index, depth) in depths.iter().enumerate() {
        
        let next_index = index + 1;

        if next_index < vec_len && depths[next_index ] > *depth {
            
            counter += 1;
        }
    }

    println!("{}", counter)
    
}
