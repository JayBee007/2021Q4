# Variables

- Variables are immutable by default
- Declared by using `let` and `const`
- Can be made mutable using `let mut`
- Constants declared in all upper case with underscore as seprators

`let` VS `const`

- `const` is immutable (`mut` keyword not applicable)
- `const` are type annotated

```rust
 const COUNT: u32 = 100_000;
```

- `let` can be set to a return value of a function
- `const` can only be set to expressions or any value that is computed at runtime
-

## Variable shadowing

- Creating a new variable with an existing name

```rust
    let variable: i32 = 5;
    println!("Variable: {}", variable);
    let variable: &str = "Ten";
    println!("Variable: {}", variable);
```

- Preserves immutablity
- Can change types

# Data types

- Scalar and Compound data types
- Scalar data types represent a single value
- Compound data types repreent a group of values

## Scalar data types

- Integers (signed & unsigned)
  - 8,16,32,64,128, arch(isize)
  - defaults to `i32`
  - ```rust
        let a: i32 = 98_222 // Decimal
        let b: i32 = 0xff // Hex
        let c: i32 = 0o77 // Octal
        let d: i32 = 0b1111_0000 // Binary
        let e: u8 = b'A'; // Byte (u8 only)
        let f: u8 = 255;
    ```
- Floating-point numbers
  - defaults to 64-bit double precision
- Booleans
  - `true` OR `false`
- Character
  - represents an unicode character
  - written with single quotes

## Compound types

- Tuple

  - Analogus to fixed size array
  - Starts at index 0
  - Data can be of different types
  - ```rust
        let tuple: (&str, i32) = ("Hello Rust!", 10000)
    ```
  - Values can extracted using destructring or by dot notation
  - ```rust
        let tuple: (&str, i32) = ("Hello Rust!", 10000)
        let (x , y ) = tuple;
        let w = tuple.0;
        let v = tuple.1;
    ```

- Array

  - Comma separated list with square brackets
  - Arrays are fixed length
  - Can be declared with an alternative syntax
  - ```rust
        // create an array with 8 values all set to 0
        let value: [i32; _ ] = [0; 8]
    ```

- Vectors
  - Similar to arrays but dyanamic
