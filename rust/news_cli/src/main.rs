use std::error::Error;
use std::env;
use colour::{dark_green, yellow};
use dotenv::dotenv;

use newsapi::{ get_articles, Articles };

const API_KEY: &str = "API_KEY";



fn render_articles(articles: &Articles) {
    for article in &articles.articles {
        dark_green!("> {}\n", article.title);
        yellow!(" - {}\n\n", article.url);
    }
}


fn main() -> Result<(), Box<dyn Error>> {
    dotenv().ok();

    let api_key = env::var(API_KEY)?;

    let url = format!("https://newsapi.org/v2/top-headlines?country=us&apiKey={}", api_key);

    let articles = get_articles(url)?;

    render_articles(&articles);

    Ok(())
}
