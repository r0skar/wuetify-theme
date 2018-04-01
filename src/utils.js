/**
 * Get the current WP URL.
 */
export const wpUrl = process.env.NODE_ENV === 'production' ? process.env.WP_LIVE_URL : process.env.WP_DEV_URL

/**
 * Connect to WP API and get post object for path.
 */
export const fetchWpPostObject = async path => {
  const response = await fetch(`${wpUrl}wp-json/nodeifywp/v1/route?location=${path}`)
  const json = await response.json()
  return json
}
