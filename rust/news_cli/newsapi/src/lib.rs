use thiserror::Error;
use ureq::get;
use serde::{Deserialize};

#[derive(Error, Debug)]
pub enum NewsApiError {
    #[error("Fetching articles failed")]
    RequestFailed(ureq::Error),
    #[error("Couldnt convert response to string")]
    FailedResToString(std::io::Error),
    #[error("Parsing article failed")]
    ParseArticleFailed(serde_json::Error),
}

#[derive(Debug, Deserialize)]
pub struct Article {
    pub title: String,
    pub url: String
}

#[derive(Debug, Deserialize)]
pub struct Articles{
    pub articles: Vec<Article>
}

pub fn get_articles(url: String) -> Result<Articles, NewsApiError> {
    let response = get(&url).call().map_err(|err| NewsApiError::RequestFailed(err))?.into_string().map_err(|err| NewsApiError::FailedResToString(err))?;

    let articles:Articles = serde_json::from_str(&response).map_err(|err| NewsApiError::ParseArticleFailed(err))?;

    Ok(articles)
}