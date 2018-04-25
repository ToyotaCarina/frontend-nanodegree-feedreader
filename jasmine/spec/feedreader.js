/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Test loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have all URL defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe('');
      });
    });

    /* Test loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have all names defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name).not.toBe('');
      });
    });
  });


  /* Test suite for the menu element */
  describe('The menu', function() {
    /* Test ensures the menu element is
     * hidden by default.
     */
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* Test ensures the menu changes
     * visibility when the menu icon is clicked.
     */
    it('changes visibility on click', function() {
      var menuIcon = $('.menu-icon-link');
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  /* Test suite for the initial entries*/
  describe('Initial Entries', function() {
    /* Test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('returns at least one element', function(done) {
      var entries = $('.feed .entry');
      expect(entries.length).toBeGreaterThan(0);
      done();
    });
  });

  /* Test suite for new feed selection */
  describe('New Feed Selection', function() {
    /* Test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    var initialContent = '';
    var nextContent = '';

    beforeEach(function(done) {
      loadFeed(1, function() {
        initialContent = $('.feed .entry').html();
        loadFeed(0, function() {
          nextContent = $('.feed .entry').html();
          done();
        });
      });
    });

    it('actually changing content', function(done) {
      expect(initialContent).not.toBe(nextContent);
      done();
    });
  });
}());