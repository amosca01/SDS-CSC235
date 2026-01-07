library(dplyr)
library(ggplot2)
library(RColorBrewer)
library(plotly)
library(GGally)

setwd("~/Desktop")
ds <- read.csv("tmdb_5000_movies.csv")
ds$release_date <- as.Date(ds$release_date, format = "%m/%d/%Y")

summary(ds)
table(ds$status)
table(ds$original_language)
table(ds$genre1)

ggplot(ds, aes(y = budget)) +
  geom_boxplot() + 
  theme_minimal() +
  ggtitle("Budget Distribution") +
  ylab("Budget ($)") +
  theme(axis.text.x = element_blank())

ggplot(ds, aes(y = revenue)) +
  geom_boxplot() + 
  theme_minimal() +
  ggtitle("Revenue Distribution") +
  ylab("Revenue ($)") +
  theme(axis.text.x = element_blank())

ggplot(ds, aes(y = revenue)) +
  geom_boxplot() + 
  theme_minimal() +
  ggtitle("Revenue Distribution") +
  ylab("Revenue ($)") +
  theme(axis.text.x = element_blank())

ggplot(ds, aes(y = vote_average)) +
  geom_boxplot() + 
  theme_minimal() +
  ggtitle("Average Vote Distribution") +
  ylab("Average Vote") +
  theme(axis.text.x = element_blank())

ggplot(ds, aes(x = budget)) +
  geom_histogram() + 
  theme_minimal() +
  ggtitle("Budget Distribution") +
  xlab("Budget ($)") +
  ylab("Count")

ggplot(ds, aes(x = revenue)) +
  geom_histogram() + 
  theme_minimal() +
  ggtitle("Revenue Distribution") +
  xlab("Revenue ($)")  +
  ylab("Count") 

ggplot(ds, aes(x = vote_average)) +
  geom_histogram() + 
  theme_minimal() +
  ggtitle("Average Vote Distribution") +
  xlab("Average Vote") +
  ylab("Count") 

ggplot(ds, aes(x = status)) +
  geom_bar() +
  theme_minimal() + 
  labs(title = "Frequency of Status",
       x = "Status",
       y = "Count")

ggplot(ds, aes(x = genre1)) +
  geom_bar() +
  theme_minimal() + 
  labs(title = "Frequency of First Genre",
       x = "First Genre",
       y = "Count") + 
  theme(axis.text.x = element_text(angle = 90, hjust = 1))

ds_animation <- ds %>% 
  filter(genre1 == " Animation") %>%
  filter(release_date < as.Date("2025-01-01"))

ggplot(ds_animation, aes(x=budget, y=popularity)) +
  geom_point() +
  theme_minimal() + 
  labs(title = "Budget vs. Popularity: Animation Films",
       x = "Budget ($)",
       y = "Popularity Score") 

ggplot(ds_animation, aes(x=release_date, y=popularity)) +
  geom_point() +
  theme_minimal() + 
  labs(title = "Budget vs. Release Date: Animation Films",
       x = "Release Date",
       y = "Popularity Score") + 
  theme(axis.text.x = element_text(angle = 90, hjust = 1))

ds_genre_bud <- ds %>%
  group_by(genre1) %>%
  summarise(mean_budget = mean(budget))

ggplot(ds_genre_bud, aes(x = genre1, y = mean_budget)) +
  geom_col() +
  theme_minimal() + 
  labs(title = "Average Budget by First Genre",
       x = "First Genre",
       y = "Average Budget ($)") + 
  theme(axis.text.x = element_text(angle = 90, hjust = 1))

ds_splom <- ds %>%
  select(budget, popularity, revenue, runtime, vote_average)

ggpairs(ds_splom)


