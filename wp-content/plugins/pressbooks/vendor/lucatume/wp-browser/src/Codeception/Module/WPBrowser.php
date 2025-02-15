<?php
/**
 * A Codeception module offering specific WordPress browsing methods.
 *
 * @package Codeception\Module
 */

namespace Codeception\Module;

use Codeception\Exception\ModuleConfigException;
use Codeception\Exception\ModuleException;
use DOMElement;
use Facebook\WebDriver\Cookie as FacebookWebdriverCookie;
use Symfony\Component\BrowserKit\Cookie;

use Symfony\Component\DomCrawler\Crawler;

use function tad\WPBrowser\requireCodeceptionModules;

//phpcs:disable
requireCodeceptionModules('WPBrowser', ['PhpBrowser']);
//phpcs:enable

/**
 * Class WPBrowser
 *
 * @package Codeception\Module
 */
class WPBrowser extends PhpBrowser
{
    use WPBrowserMethods;
    use ThemeMethods;

    /**
     * The module required fields, to be set in the suite .yml configuration file.
     *
     * @var array<string>
     */
    protected $requiredFields = ['adminUsername', 'adminPassword', 'adminPath'];

    /**
     * Returns all the cookies whose name matches a regex pattern.
     *
     * @param string $cookiePattern The regular expression pattern to use for the matching.
     *
     * @return array<FacebookWebdriverCookie|Cookie>|null An array of cookies matching the pattern.
     * @example
     * ```php
     * $I->loginAs('customer','password');
     * $I->amOnPage('/shop');
     * $cartCookies = $I->grabCookiesWithPattern("#^shop_cart\\.*#");
     * ```
     *
     */
    public function grabCookiesWithPattern($cookiePattern)
    {
        /**
         * @var array<FacebookWebdriverCookie|Cookie>
         */
        $cookies = $this->client->getCookieJar()->all();

        if (!$cookies) {
            return null;
        }
        $matchingCookies = array_filter($cookies, static function ($cookie) use ($cookiePattern) {
            return preg_match($cookiePattern, $cookie->getName());
        });
        $cookieList = array_map(static function ($cookie) {
            return sprintf('{"%s": "%s"}', $cookie->getName(), $cookie->getValue());
        }, $matchingCookies);

        $this->debug('Cookies matching pattern ' . $cookiePattern . ' : ' . implode(', ', $cookieList));

        return count($matchingCookies) ? $matchingCookies : null;
    }

    /**
     * In the plugin administration screen activates a plugin clicking the "Activate" link.
     *
     * The method will **not** handle authentication to the admin area.
     *
     * @param string|array<string> $pluginSlug The plugin slug, like "hello-dolly" or a list of plugin slugs.
     *
     * @return void
     * @example
     * ```php
     * // Activate a plugin.
     * $I->loginAsAdmin();
     * $I->amOnPluginsPage();
     * $I->activatePlugin('hello-dolly');
     * // Activate a list of plugins.
     * $I->loginAsAdmin();
     * $I->amOnPluginsPage();
     * $I->activatePlugin(['hello-dolly','another-plugin']);
     * ```
     *
     */
    public function activatePlugin($pluginSlug)
    {
        foreach ((array)$pluginSlug as $plugin) {
            $this->checkOption('//*[@data-slug="' . $plugin . '"]/th/input');
        }
        $this->selectOption('action', 'activate-selected');
        $this->click("#doaction");
    }

    /**
     * In the plugin administration screen deactivate a plugin clicking the "Deactivate" link.
     *
     * The method will **not** handle authentication and navigation to the plugins administration page.
     *
     * @param string|array<string> $pluginSlug The plugin slug, like "hello-dolly", or a list of plugin slugs.
     *
     * @return void
     * @example
     * ```php
     * // Deactivate one plugin.
     * $I->loginAsAdmin();
     * $I->amOnPluginsPage();
     * $I->deactivatePlugin('hello-dolly');
     * // Deactivate a list of plugins.
     * $I->loginAsAdmin();
     * $I->amOnPluginsPage();
     * $I->deactivatePlugin(['hello-dolly', 'my-plugin']);
     * ```
     *
     */
    public function deactivatePlugin($pluginSlug)
    {
        foreach ((array)$pluginSlug as $plugin) {
            $this->checkOption('//*[@data-slug="' . $plugin . '"]/th/input');
        }
        $this->selectOption('action', 'deactivate-selected');
        $this->click('#doaction');
    }

    /**
     * Validates the module configuration.
     *
     * @return void
     *
     * @throws ModuleConfigException|ModuleException If there's any issue.
     */
    protected function validateConfig()
    {
        $this->configBackCompat();

        parent::validateConfig();
    }
}
