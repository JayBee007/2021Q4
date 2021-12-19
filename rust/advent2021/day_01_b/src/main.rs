// https://adventofcode.com/2021/day/1 
// part 2

use std::fs;

fn lines_to_vec() -> Vec<u32> {
    let path = "input.txt";
    let file = fs::read_to_string(path).unwrap();
    
    file.lines().flat_map(str::parse::<u32>).collect()
}


fn main() {
    let depths = lines_to_vec();
    let window_size = 3;

    let mut result:Vec<u32> = vec![];
    let mut current_sum = u32::MIN;
    let mut previous_sum = u32::MIN;
    

    for (index, _) in depths.iter().enumerate() {
        current_sum += depths[index];

        if index >= window_size - 1 {    
            result.push(current_sum);

            if current_sum > previous_sum {                
                previous_sum = current_sum;
                
            }
            current_sum -= depths[index - (window_size-1)];
        }
    }

    let mut counter = 0;

    let vec_len = result.len();

    for (index, depth) in result.iter().enumerate() {
        
        let next_index = index + 1;

        if next_index < vec_len && result[next_index ] > *depth {
            
            counter += 1;
        }
    }

    println!("{}",counter)    

}