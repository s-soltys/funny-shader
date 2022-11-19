const float iRipplePeriod = 6.;
const float iRipplePeriodOscillationSpeed = 1.2;
const float iRippleImpact = .1;

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    // camera texture coordinates
    vec2 uv = fragCoord / iResolution.xy;
    // standard coordinates
    vec2 st = (fragCoord - (iResolution.xy / 2.)) / max(iResolution.x, iResolution.y);
    float dist = length(st);
    // camera input translation vector
    vec2 trans = vec2(sin(dist * iRipplePeriod + sin(iTime * iRipplePeriodOscillationSpeed))) * iRippleImpact;
    vec3 color = texture(iChannel0, uv + trans).rgb;
    fragColor = vec4(color, 1.0);
}