module.exports = {
  blogPostDir: "articles", // The name of directory that contains your posts.
  siteTitle: "Daniel Noyola", // Site title.
  siteTitleAlt: "A developer's blog", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://daniel.noyola.me", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Daniel Noyola's blog.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "169468480426768", // FB Application ID for using app insights
  googleAnalyticsID: "UA-118055277-1", // GA tracking ID.
	disqusShortname: "danielnv18", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "Daniel Noyola", // Username to display in the author segment.
  userTwitter: "danielnv18", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Internet", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription:
    "Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven't seen you in a year. And the good thing about dogs... is they got different dogs for different people.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/danielnv18/gatsby-advanced-starter",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/danielnv18",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:danielnv18@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2018. Daniel Noyola", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};
