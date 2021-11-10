mod theme;

use std::error::Error;
use std::env;
use dotenv::dotenv;

use newsapi::{NewsAPI, Endpoint, Country, Article};

const API_KEY: &str = "API_KEY";



fn render_articles(articles: &Vec<Article>) {
    let theme = theme::default();
    theme.print_text("# Top headlines\n\n");
    for article in articles {
        theme.print_text(&format!("`> {}`", article.title()));
        theme.print_text(&format!("- *{}*", article.url()));
        theme.print_text("---");

    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    dotenv().ok();

    let api_key = env::var(API_KEY)?;

    let mut newsapi = NewsAPI::new(&api_key);

    newsapi.endpoint(Endpoint::TopHeadlines).country(Country::Us);


    let newsapi_response = newsapi.fetch_async().await?;

    render_articles(&newsapi_response.articles());

    Ok(())
}
