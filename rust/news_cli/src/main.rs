use std::error::Error;
use ureq::get;
use serde::{Deserialize};
use colour::{dark_green, yellow};
use dotenv::dotenv;
use std::env;

const API_KEY: &str = "API_KEY";

#[derive(Debug, Deserialize)]
struct Article {
    title: String,
    url: String
}

#[derive(Debug, Deserialize)]
struct Articles{
    articles: Vec<Article>
}

fn get_articles(url: String) -> Result<Articles, Box<dyn Error>> {
    let response = get(&url).call()?.into_string()?;

    let articles:Articles = serde_json::from_str(&response)?;

    Ok(articles)
}

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
