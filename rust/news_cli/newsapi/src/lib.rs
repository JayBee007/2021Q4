use std::error::Error;
use ureq::get;
use serde::{Deserialize};


#[derive(Debug, Deserialize)]
pub struct Article {
    pub title: String,
    pub url: String
}

#[derive(Debug, Deserialize)]
pub struct Articles{
    pub articles: Vec<Article>
}

pub fn get_articles(url: String) -> Result<Articles, Box<dyn Error>> {
    let response = get(&url).call()?.into_string()?;

    let articles:Articles = serde_json::from_str(&response)?;

    Ok(articles)
}