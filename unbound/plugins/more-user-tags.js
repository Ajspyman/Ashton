({__plugin:null,__load(){if(this.__plugin)return this.__plugin;this.__plugin=(function () {
'use strict';
function _array_like_to_array$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$1(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes$1(arr) {
    if (Array.isArray(arr)) return _array_like_to_array$1(arr);
}
function _iterable_to_array$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _non_iterable_rest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_array(arr) {
    return _array_with_holes$1(arr) || _iterable_to_array$1(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_rest$1();
}
function _to_consumable_array$1(arr) {
    return _array_without_holes$1(arr) || _iterable_to_array$1(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_spread$1();
}
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
function colorComponentsToHex(red, green, blue) {
    var components = [
        red,
        green,
        blue
    ];
    if (components.some(function(component) {
        return !Number.isFinite(component) || component < 0 || component > 1;
    })) {
        return null;
    }
    return "#".concat(components.map(function(component) {
        return Math.round(component * 255).toString(16).padStart(2, '0');
    }).join(''));
}
function parseNativeColorDescription(description) {
    var _description_trim_split = _to_array(description.trim().split(/\s+/)), space = _description_trim_split[0], values = _description_trim_split.slice(1);
    var components = values.map(Number);
    var channels;
    var alpha;
    if (space === 'UIExtendedSRGBColorSpace' && components.length === 4) {
        channels = components.slice(0, 3);
        alpha = components[3];
    } else if (space === 'UIExtendedGrayColorSpace' && components.length === 2) {
        channels = [
            components[0],
            components[0],
            components[0]
        ];
        alpha = components[1];
    } else {
        return null;
    }
    if (!Number.isFinite(alpha) || alpha < 0 || alpha > 1) return null;
    var hex = colorComponentsToHex(channels[0], channels[1], channels[2]);
    return hex ? {
        hex: hex,
        alpha: alpha
    } : null;
}
function getRoleGradientKey(label, color) {
    return "".concat(label.trim().toLowerCase(), ":").concat(color.toLowerCase());
}
function validHexColor(color) {
    return typeof color === 'string' && /^#[\da-f]{6}$/i.test(color);
}
function getRoleColorStops(colors, fallbackColor) {
    var includeEnhanced = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    var primary = validHexColor(colors === null || colors === void 0 ? void 0 : colors.primaryColor) ? colors.primaryColor : fallbackColor;
    if (!validHexColor(primary)) return [];
    if (!includeEnhanced) return [
        primary
    ];
    return [
        primary,
        colors === null || colors === void 0 ? void 0 : colors.secondaryColor,
        colors === null || colors === void 0 ? void 0 : colors.tertiaryColor
    ].filter(function(color, index, stops) {
        return validHexColor(color) && stops.indexOf(color) === index;
    });
}
function getRoleColorAppearance(colors, fallbackColor) {
    var includeEnhanced = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    var stops = getRoleColorStops(colors, fallbackColor, includeEnhanced);
    var style = stops.length < 2 ? 'solid' : includeEnhanced && stops.length >= 3 && validHexColor(colors === null || colors === void 0 ? void 0 : colors.secondaryColor) && validHexColor(colors === null || colors === void 0 ? void 0 : colors.tertiaryColor) ? 'holographic' : 'gradient';
    return {
        colors: stops,
        style: style
    };
}
function relativeLuminance(color) {
    var value = Number.parseInt(color.slice(1), 16);
    var channels = [
        value >> 16 & 0xff,
        value >> 8 & 0xff,
        value & 0xff
    ].map(function(channel) {
        var normalized = channel / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function getContrastingTextColor(backgrounds) {
    var _Math, _Math1;
    if (backgrounds.length === 0) return '#ffffff';
    var luminances = backgrounds.map(relativeLuminance);
    var whiteContrast = (_Math = Math).min.apply(_Math, _to_consumable_array$1(luminances.map(function(luminance) {
        return 1.05 / (luminance + 0.05);
    })));
    var blackContrast = (_Math1 = Math).min.apply(_Math1, _to_consumable_array$1(luminances.map(function(luminance) {
        return (luminance + 0.05) / 0.05;
    })));
    return blackContrast > whiteContrast ? '#000000' : '#ffffff';
}function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _define_property$1(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property$1(target, key, source[key]);
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of$1(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function rectSignature(rect) {
    var value = rect === null || rect === void 0 ? void 0 : rect.value;
    if (!value) return null;
    var coordinates = [
        value.origin.x,
        value.origin.y,
        value.size.width,
        value.size.height
    ];
    return coordinates.every(Number.isFinite) ? coordinates.join(':') : null;
}
function invoke(objc, target, selector) {
    var args = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [];
    return objc.invoke(target, selector, args, {
        thread: 'main'
    });
}
function gradientColorObject(objc, arrayClass, uiColorClass, color) {
    var alpha = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
    if (!/^#[\da-f]{6}$/i.test(color)) return null;
    var value = Number.parseInt(color.slice(1), 16);
    var red = (value >> 16 & 0xff) / 255;
    var green = (value >> 8 & 0xff) / 255;
    var blue = (value & 0xff) / 255;
    try {
        var uiColor = invoke(objc, uiColorClass, 'colorWithRed:green:blue:alpha:', [
            red,
            green,
            blue,
            alpha
        ]);
        if (!uiColor) return null;
        var pointer = invoke(objc, uiColor, 'CGColor');
        if (!pointer) return null;
        var colors = invoke(objc, arrayClass, 'arrayWithObject:', [
            pointer
        ]);
        if (!Array.isArray(colors)) return null;
        var _colors = _sliced_to_array(colors, 1), nativeColor = _colors[0];
        return nativeColor && (typeof nativeColor === "undefined" ? "undefined" : _type_of$1(nativeColor)) === 'object' ? nativeColor : null;
    } catch (unused) {
        return null;
    }
}
function keyForLabel(label, color) {
    return getRoleGradientKey(label, color);
}
function appearanceForLabel(appearances, label, primaryColor) {
    var _unique_values_next_value;
    if (primaryColor) {
        var appearance = appearances.get(keyForLabel(label, primaryColor));
        if (appearance) return {
            primaryColor: primaryColor,
            appearance: appearance
        };
    }
    var prefix = "".concat(label.trim().toLowerCase(), ":");
    var unique = new Map();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = appearances[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array(_step.value, 2), key = _step_value[0], appearance1 = _step_value[1];
            if (!key.startsWith(prefix)) continue;
            unique.set(JSON.stringify(appearance1), {
                primaryColor: key.slice(prefix.length),
                appearance: appearance1
            });
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (unique.size !== 1) return null;
    return (_unique_values_next_value = unique.values().next().value) !== null && _unique_values_next_value !== void 0 ? _unique_values_next_value : null;
}
function viewIdentifier(objc, view) {
    return String(invoke(objc, view, 'hash'));
}
function nativeChildren(objc, view) {
    var children = invoke(objc, view, 'subviews');
    if (Array.isArray(children)) return children;
    if (!children || (typeof children === "undefined" ? "undefined" : _type_of$1(children)) !== 'object') return [];
    try {
        return objc.array(children);
    } catch (unused) {
        return [];
    }
}
function attempt(operation) {
    try {
        operation();
        return true;
    } catch (unused) {
        return false;
    }
}
function createTagGradientRenderer(context) {
    var objc = context.native.objc;
    var tagViewClass = objc.getClass('DiscordChat.MessageTagView');
    var labelClass = objc.getClass('DCDLabel');
    var gradientLayerClass = objc.getClass('CAGradientLayer');
    var arrayClass = objc.getClass('NSArray');
    var basicAnimationClass = objc.getClass('CABasicAnimation');
    var timingFunctionClass = objc.getClass('CAMediaTimingFunction');
    var accessibilityClass = objc.getClass('UIAccessibility');
    var uiColorClass = objc.getClass('UIColor');
    if (!tagViewClass || !labelClass || !gradientLayerClass || !arrayClass || !uiColorClass) {
        return null;
    }
    var resolvedTagViewClass = tagViewClass;
    var resolvedGradientLayerClass = gradientLayerClass;
    var resolvedArrayClass = arrayClass;
    var resolvedBasicAnimationClass = basicAnimationClass;
    var resolvedTimingFunctionClass = timingFunctionClass;
    var resolvedAccessibilityClass = accessibilityClass;
    var resolvedUIColorClass = uiColorClass;
    var clearColor = function() {
        try {
            return invoke(objc, resolvedUIColorClass, 'clearColor');
        } catch (unused) {
            return null;
        }
    }();
    if (!clearColor) return null;
    if (!invoke(objc, resolvedTagViewClass, 'instancesRespondToSelector:', [
        'layoutSubviews'
    ])) return null;
    var associationKey = objc.createAssociationKey();
    var appearances = new Map();
    var records = new Map();
    var updating = new Set();
    var pendingUpdates = new Map();
    var hookTokens = [];
    var stopped = false;
    var reduceMotion = function() {
        if (!resolvedAccessibilityClass) return false;
        try {
            return Boolean(invoke(objc, resolvedAccessibilityClass, 'isReduceMotionEnabled'));
        } catch (unused) {
            return false;
        }
    }();
    function isTransparent(color) {
        var _parseNativeColorDescription;
        if (!color) return false;
        if (Boolean(invoke(objc, color, 'isEqual:', [
            clearColor
        ]))) return true;
        var description = invoke(objc, color, 'description');
        return typeof description === 'string' && ((_parseNativeColorDescription = parseNativeColorDescription(description)) === null || _parseNativeColorDescription === void 0 ? void 0 : _parseNativeColorDescription.alpha) === 0;
    }
    function removeRecord(record, restoreBackground) {
        var wasUpdating = updating.has(record.id);
        updating.add(record.id);
        try {
            attempt(function() {
                return invoke(objc, record.layer, 'removeFromSuperlayer');
            });
            if (restoreBackground) {
                var background = function() {
                    try {
                        return invoke(objc, record.label, 'backgroundColor');
                    } catch (unused) {
                        return null;
                    }
                }();
                if (isTransparent(background)) {
                    attempt(function() {
                        return invoke(objc, record.label, 'setBackgroundColor:', [
                            record.originalBackground
                        ]);
                    });
                }
                if (!Boolean(invoke(objc, record.label, 'isOpaque'))) {
                    attempt(function() {
                        return invoke(objc, record.label, 'setOpaque:', [
                            record.originalOpaque
                        ]);
                    });
                }
            }
            attempt(function() {
                return objc.setAssociatedObject(record.label, associationKey, null, 'assign');
            });
            records.delete(record.id);
        } finally{
            if (!wasUpdating) updating.delete(record.id);
        }
    }
    function updateFrame(record) {
        var labelLayer = invoke(objc, record.label, 'layer');
        var frame = invoke(objc, record.label, 'frame');
        var signature = rectSignature(frame);
        var radius = Number(invoke(objc, labelLayer, 'cornerRadius'));
        if (signature && signature !== record.frameSignature) {
            invoke(objc, record.layer, 'setFrame:', [
                frame
            ]);
            record.frameSignature = signature;
        }
        if (Number.isFinite(radius) && radius !== record.cornerRadius) {
            invoke(objc, record.layer, 'setCornerRadius:', [
                radius
            ]);
            record.cornerRadius = radius;
        }
        if (record.sheenLayer) {
            var layerBounds = invoke(objc, record.layer, 'bounds');
            var sheenSignature = rectSignature(layerBounds);
            if (sheenSignature && sheenSignature !== record.sheenFrameSignature) {
                invoke(objc, record.sheenLayer, 'setFrame:', [
                    layerBounds
                ]);
                record.sheenFrameSignature = sheenSignature;
            }
            if (Number.isFinite(radius) && radius !== record.sheenCornerRadius) {
                invoke(objc, record.sheenLayer, 'setCornerRadius:', [
                    radius
                ]);
                record.sheenCornerRadius = radius;
            }
        }
    }
    function createHolographicSheen(parentLayer) {
        if (!resolvedBasicAnimationClass || reduceMotion) return null;
        var sheenLayer = null;
        try {
            sheenLayer = invoke(objc, resolvedGradientLayerClass, 'layer');
            if (!sheenLayer) return null;
            var sheenColors = [
                gradientColorObject(objc, resolvedArrayClass, resolvedUIColorClass, '#ffffff', 0),
                gradientColorObject(objc, resolvedArrayClass, resolvedUIColorClass, '#ffffff', 0.26),
                gradientColorObject(objc, resolvedArrayClass, resolvedUIColorClass, '#d8f4ff', 0.34),
                gradientColorObject(objc, resolvedArrayClass, resolvedUIColorClass, '#ffffff', 0.26),
                gradientColorObject(objc, resolvedArrayClass, resolvedUIColorClass, '#ffffff', 0)
            ];
            if (sheenColors.some(function(color) {
                return !color;
            })) return null;
            invoke(objc, sheenLayer, 'setColors:', [
                sheenColors
            ]);
            invoke(objc, sheenLayer, 'setLocations:', [
                [
                    0,
                    0.1,
                    0.2,
                    0.3,
                    0.4
                ]
            ]);
            invoke(objc, sheenLayer, 'setStartPoint:', [
                objc.struct('CGPoint', {
                    x: 0,
                    y: 0
                })
            ]);
            invoke(objc, sheenLayer, 'setEndPoint:', [
                objc.struct('CGPoint', {
                    x: 1,
                    y: 0
                })
            ]);
            invoke(objc, sheenLayer, 'setMasksToBounds:', [
                true
            ]);
            invoke(objc, sheenLayer, 'setZPosition:', [
                1
            ]);
            invoke(objc, parentLayer, 'addSublayer:', [
                sheenLayer
            ]);
            var animation = invoke(objc, resolvedBasicAnimationClass, 'animationWithKeyPath:', [
                'locations'
            ]);
            if (!animation) return sheenLayer;
            invoke(objc, animation, 'setFromValue:', [
                [
                    0,
                    0.1,
                    0.2,
                    0.3,
                    0.4
                ]
            ]);
            invoke(objc, animation, 'setToValue:', [
                [
                    0.6,
                    0.7,
                    0.8,
                    0.9,
                    1
                ]
            ]);
            invoke(objc, animation, 'setDuration:', [
                3.2
            ]);
            invoke(objc, animation, 'setAutoreverses:', [
                true
            ]);
            invoke(objc, animation, 'setRepeatCount:', [
                100000
            ]);
            invoke(objc, animation, 'setRemovedOnCompletion:', [
                false
            ]);
            if (resolvedTimingFunctionClass) {
                var timingFunction = invoke(objc, resolvedTimingFunctionClass, 'functionWithName:', [
                    'easeInEaseOut'
                ]);
                if (timingFunction) invoke(objc, animation, 'setTimingFunction:', [
                    timingFunction
                ]);
            }
            invoke(objc, sheenLayer, 'addAnimation:forKey:', [
                animation,
                'more-user-tags.holographic-sheen'
            ]);
            return sheenLayer;
        } catch (unused) {
            if (sheenLayer) {
                var failedSheenLayer = sheenLayer;
                attempt(function() {
                    return invoke(objc, failedSheenLayer, 'removeFromSuperlayer');
                });
            }
            return null;
        }
    }
    function removeHolographicSheen(record) {
        var sheenLayer = record.sheenLayer;
        if (!sheenLayer) return;
        attempt(function() {
            return invoke(objc, sheenLayer, 'removeFromSuperlayer');
        });
        record.sheenLayer = null;
        record.sheenFrameSignature = '';
        record.sheenCornerRadius = null;
    }
    function applyAppearance(record, appearance) {
        var colors = appearance.colors, style = appearance.style;
        if (colors.length < 1 || colors.some(function(color) {
            return !/^#[\da-f]{6}$/i.test(color);
        })) return false;
        try {
            var background = invoke(objc, record.label, 'backgroundColor');
            if (!isTransparent(background)) {
                if (background) record.originalBackground = background;
                invoke(objc, record.label, 'setBackgroundColor:', [
                    clearColor
                ]);
            }
            if (Boolean(invoke(objc, record.label, 'isOpaque'))) invoke(objc, record.label, 'setOpaque:', [
                false
            ]);
            if (record.colors.join(':') !== colors.join(':') || record.style !== style) {
                var renderColors = colors.length === 1 ? [
                    colors[0],
                    colors[0]
                ] : colors;
                var cgColors = renderColors.map(function(color) {
                    return gradientColorObject(objc, resolvedArrayClass, resolvedUIColorClass, color);
                });
                if (cgColors.some(function(color) {
                    return !color;
                })) return false;
                invoke(objc, record.layer, 'setColors:', [
                    cgColors
                ]);
                invoke(objc, record.layer, 'setLocations:', [
                    renderColors.map(function(_, index) {
                        return index / (renderColors.length - 1);
                    })
                ]);
                invoke(objc, record.layer, 'setStartPoint:', [
                    objc.struct('CGPoint', {
                        x: 0,
                        y: 0
                    })
                ]);
                invoke(objc, record.layer, 'setEndPoint:', [
                    objc.struct('CGPoint', {
                        x: 1,
                        y: 0
                    })
                ]);
                invoke(objc, record.layer, 'setMasksToBounds:', [
                    true
                ]);
                invoke(objc, record.layer, 'setNeedsDisplay');
                if (style === 'holographic') {
                    var _record, _sheenLayer;
                    (_sheenLayer = (_record = record).sheenLayer) !== null && _sheenLayer !== void 0 ? _sheenLayer : _record.sheenLayer = createHolographicSheen(record.layer);
                } else {
                    removeHolographicSheen(record);
                }
                record.colors = _to_consumable_array(colors);
            }
            record.style = style;
            updateFrame(record);
            return true;
        } catch (unused) {
            return false;
        }
    }
    function createRecord(label, labelName, primaryColor, appearance) {
        var layer = null;
        var originalBackground = null;
        var associated = false;
        var id = viewIdentifier(objc, label);
        try {
            var parent = invoke(objc, label, 'superview');
            if (!parent) return null;
            var parentLayer = invoke(objc, parent, 'layer');
            if (!parentLayer) return null;
            layer = invoke(objc, resolvedGradientLayerClass, 'layer');
            if (!layer) return null;
            originalBackground = invoke(objc, label, 'backgroundColor');
            var originalOpaque = Boolean(invoke(objc, label, 'isOpaque'));
            var labelLayer = invoke(objc, label, 'layer');
            var record = {
                id: id,
                label: label,
                layer: layer,
                frameSignature: '',
                cornerRadius: null,
                sheenFrameSignature: '',
                sheenCornerRadius: null,
                originalBackground: originalBackground,
                originalOpaque: originalOpaque,
                labelName: labelName,
                primaryColor: primaryColor,
                colors: [],
                style: 'solid',
                sheenLayer: null
            };
            invoke(objc, parentLayer, 'insertSublayer:below:', [
                layer,
                labelLayer
            ]);
            objc.setAssociatedObject(label, associationKey, layer, 'retain');
            associated = true;
            invoke(objc, label, 'setBackgroundColor:', [
                clearColor
            ]);
            invoke(objc, label, 'setOpaque:', [
                false
            ]);
            records.set(id, record);
            if (!applyAppearance(record, appearance)) {
                removeRecord(record, true);
                return null;
            }
            return record;
        } catch (unused) {
            var failedLayer = layer;
            if (failedLayer) attempt(function() {
                return invoke(objc, failedLayer, 'removeFromSuperlayer');
            });
            if (associated) attempt(function() {
                return objc.setAssociatedObject(label, associationKey, null, 'assign');
            });
            attempt(function() {
                return invoke(objc, label, 'setBackgroundColor:', [
                    originalBackground
                ]);
            });
            return null;
        }
    }
    function labelColors(label, record) {
        var _ref;
        var text = invoke(objc, label, 'text');
        var accessibilityLabel = invoke(objc, label, 'accessibilityLabel');
        var labelName = typeof text === 'string' && text.length > 0 ? text : typeof accessibilityLabel === 'string' ? accessibilityLabel : '';
        if (!labelName) return null;
        var background = invoke(objc, label, 'backgroundColor');
        var description = background ? invoke(objc, background, 'description') : null;
        var color = typeof description === 'string' ? parseNativeColorDescription(description) : null;
        var primaryColor = color && color.alpha > 0 ? color.hex : (_ref = record === null || record === void 0 ? void 0 : record.primaryColor) !== null && _ref !== void 0 ? _ref : null;
        var appearance = appearanceForLabel(appearances, labelName, primaryColor);
        return appearance ? _object_spread$1({
            labelName: labelName
        }, appearance) : null;
    }
    function updateLabel(label) {
        if (stopped || appearances.size === 0 || objc.className(label) !== 'DCDLabel') return;
        var id = viewIdentifier(objc, label);
        if (updating.has(id)) return;
        updating.add(id);
        try {
            var record = records.get(id);
            var result = labelColors(label, record);
            if (!result) {
                if (record) removeRecord(record, true);
                return;
            }
            if (record && (record.labelName !== result.labelName || record.primaryColor !== result.primaryColor)) {
                removeRecord(record, true);
                record = undefined;
            }
            if (!record) {
                createRecord(label, result.labelName, result.primaryColor, result.appearance);
                return;
            }
            if (!applyAppearance(record, result.appearance)) removeRecord(record, true);
        } catch (unused) {
            return;
        } finally{
            updating.delete(id);
        }
    }
    function scheduleLabelUpdate(label) {
        if (stopped || appearances.size === 0 || objc.className(label) !== 'DCDLabel') return;
        var id = viewIdentifier(objc, label);
        if (pendingUpdates.has(id)) return;
        var retainedLabel;
        try {
            retainedLabel = invoke(objc, label, 'retain');
        } catch (unused) {
            return;
        }
        var timer = setTimeout(function() {
            pendingUpdates.delete(id);
            try {
                updateLabel(retainedLabel);
            } finally{
                attempt(function() {
                    return invoke(objc, retainedLabel, 'release');
                });
            }
        }, 0);
        pendingUpdates.set(id, {
            label: retainedLabel,
            timer: timer
        });
    }
    function addHook(className, selector, handler) {
        try {
            hookTokens.push(objc.hook(className, selector, {
                after: function after(param) {
                    var target = param.self;
                    return handler(target);
                }
            }));
            return true;
        } catch (unused) {
            return false;
        }
    }
    var backgroundHookAvailable = addHook('DCDLabel', 'setBackgroundColor:', scheduleLabelUpdate);
    var textHookAvailable = addHook('DCDLabel', 'setText:', scheduleLabelUpdate);
    var tagViewHookAvailable = addHook('DiscordChat.MessageTagView', 'layoutSubviews', function(view) {
        if (stopped || appearances.size === 0) return;
        try {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = nativeChildren(objc, view)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var label = _step.value;
                    if (objc.className(label) === 'DCDLabel') scheduleLabelUpdate(label);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } catch (unused) {
            return;
        }
    });
    if (!backgroundHookAvailable && !textHookAvailable && !tagViewHookAvailable) return null;
    var reuseHook = null;
    if (objc.getClass('DCDMessageTableViewCell')) {
        try {
            reuseHook = objc.hook('DCDMessageTableViewCell', 'prepareForReuse', {
                after: function after(param) {
                    var cell = param.self;
                    try {
                        var queue = [
                            {
                                view: cell,
                                depth: 0
                            }
                        ];
                        while(queue.length > 0){
                            var current = queue.pop();
                            if (!current) continue;
                            if (objc.className(current.view) === 'DCDLabel') {
                                var record = records.get(viewIdentifier(objc, current.view));
                                if (record) removeRecord(record, true);
                                continue;
                            }
                            if (current.depth >= 8) continue;
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(var _iterator = nativeChildren(objc, current.view).slice(0, 20)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var child = _step.value;
                                    queue.push({
                                        view: child,
                                        depth: current.depth + 1
                                    });
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                        }
                    } catch (unused) {
                        return;
                    }
                }
            });
        } catch (unused) {
            reuseHook = null;
        }
    }
    return {
        setAppearance: function setAppearance(labels, appearance) {
            if (stopped) return;
            var normalizedColors = appearance.colors.filter(function(color) {
                return /^#[\da-f]{6}$/i.test(color);
            }).map(function(color) {
                return color.toLowerCase();
            });
            var primaryColor = normalizedColors[0];
            var normalizedAppearance = {
                colors: normalizedColors,
                style: appearance.style
            };
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = labels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var label = _step.value;
                    if (!label.trim()) continue;
                    var key = primaryColor ? keyForLabel(label, primaryColor) : null;
                    if (!key) {
                        var prefix = "".concat(label.trim().toLowerCase(), ":");
                        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                        try {
                            for(var _iterator1 = appearances.keys()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                var existingKey = _step1.value;
                                if (existingKey.startsWith(prefix)) appearances.delete(existingKey);
                            }
                        } catch (err) {
                            _didIteratorError1 = true;
                            _iteratorError1 = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                    _iterator1.return();
                                }
                            } finally{
                                if (_didIteratorError1) {
                                    throw _iteratorError1;
                                }
                            }
                        }
                        continue;
                    }
                    if (normalizedColors.length < 1) {
                        appearances.delete(key);
                        continue;
                    }
                    appearances.set(key, normalizedAppearance);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        },
        stop: function stop() {
            if (stopped) return;
            stopped = true;
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                var _loop = function() {
                    var _step_value = _step.value, label = _step_value.label, timer = _step_value.timer;
                    clearTimeout(timer);
                    attempt(function() {
                        return invoke(objc, label, 'release');
                    });
                };
                for(var _iterator = pendingUpdates.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                    }
                } finally{
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            pendingUpdates.clear();
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = hookTokens[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var hook = _step1.value;
                    hook.remove();
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
            reuseHook === null || reuseHook === void 0 ? void 0 : reuseHook.remove();
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                for(var _iterator2 = _to_consumable_array(records.values())[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var record = _step2.value;
                    removeRecord(record, true);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
            appearances.clear();
        }
    };
}var SETTINGS_SPACING = {
    outer: 16,
    section: 24,
    card: 16,
    rowGap: 10,
    touchTarget: 48
};
function getSettingsColors() {
    var _ref;
    var _metro_common_Theme;
    var colors = (_ref = (_metro_common_Theme = window.unbound.metro.common.Theme) === null || _metro_common_Theme === void 0 ? void 0 : _metro_common_Theme.colors) !== null && _ref !== void 0 ? _ref : {};
    var color = function color(key, fallback) {
        return typeof colors[key] === 'string' ? colors[key] : fallback;
    };
    return {
        page: color('BACKGROUND_MOBILE_PRIMARY', color('BACKGROUND_PRIMARY', '#111214')),
        surface: color('BACKGROUND_SECONDARY', '#1e1f22'),
        input: color('BACKGROUND_TERTIARY', '#111214'),
        border: color('BACKGROUND_MODIFIER_ACCENT', '#4e5058'),
        text: color('TEXT_NORMAL', '#f2f3f5'),
        muted: color('TEXT_MUTED', '#b5bac1'),
        accent: color('BRAND_500', '#5865f2'),
        danger: color('RED_400', '#ed4245')
    };
}
function SettingsScrollView(param) {
    var children = param.children, onTouchStart = param.onTouchStart;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    return /*#__PURE__*/ React.createElement(ReactNative.ScrollView, {
        contentContainerStyle: {
            backgroundColor: colors.page,
            gap: SETTINGS_SPACING.section,
            padding: SETTINGS_SPACING.outer,
            paddingBottom: 32
        },
        keyboardDismissMode: onTouchStart ? 'on-drag' : 'none',
        keyboardShouldPersistTaps: "handled",
        onTouchStart: onTouchStart
    }, children);
}
function SettingsSection(param) {
    var title = param.title, children = param.children;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: SETTINGS_SPACING.rowGap
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 13,
            fontWeight: '800',
            letterSpacing: 0.5,
            paddingHorizontal: 4,
            textTransform: 'uppercase'
        }
    }, title), /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            gap: SETTINGS_SPACING.rowGap
        }
    }, children));
}
function SettingsCard(param) {
    var children = param.children;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    return /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: 14,
            borderWidth: 1,
            padding: SETTINGS_SPACING.card
        }
    }, children);
}
function SettingsSwitchRow(param) {
    var label = param.label, description = param.description, value = param.value, onValueChange = param.onValueChange;
    var ReactNative = window.unbound.metro.common.ReactNative;
    var colors = getSettingsColors();
    return /*#__PURE__*/ React.createElement(SettingsCard, null, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 12,
            minHeight: SETTINGS_SPACING.touchTarget
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.View, {
        style: {
            flex: 1,
            gap: 4
        }
    }, /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.text,
            fontSize: 16,
            fontWeight: '700'
        }
    }, label), description ? /*#__PURE__*/ React.createElement(ReactNative.Text, {
        style: {
            color: colors.muted,
            fontSize: 14,
            lineHeight: 19
        }
    }, description) : null), /*#__PURE__*/ React.createElement(ReactNative.Switch, {
        onValueChange: onValueChange,
        value: value
    })));
}function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var ADDON_ID = 'unbound.more-user-tags';
var STORE = window.unbound.storage.getStore(ADDON_ID);
var TAGS = [
    {
        name: 'WEBHOOK',
        color: '#5865F2',
        displayName: 'Webhook',
        description: 'Messages sent by webhooks',
        condition: function condition(message, user) {
            return Boolean(message === null || message === void 0 ? void 0 : message.webhookId) && Boolean(user === null || user === void 0 ? void 0 : user.bot);
        }
    },
    {
        name: 'OWNER',
        color: '#F0B232',
        displayName: 'Owner',
        description: 'Owns the server',
        condition: function condition(_message, user, guild) {
            return Boolean(guild) && guild.ownerId === (user === null || user === void 0 ? void 0 : user.id);
        }
    },
    {
        name: 'ADMINISTRATOR',
        color: '#DA373C',
        displayName: 'Admin',
        description: 'Has the administrator permission',
        permissions: [
            'ADMINISTRATOR'
        ]
    },
    {
        name: 'MODERATOR_STAFF',
        color: '#248046',
        displayName: 'Staff',
        description: 'Can manage the server, channels or roles',
        permissions: [
            'MANAGE_GUILD',
            'MANAGE_CHANNELS',
            'MANAGE_ROLES',
            'MANAGE_WEBHOOKS'
        ]
    },
    {
        name: 'MODERATOR',
        color: '#4E7FFF',
        displayName: 'Mod',
        description: 'Can manage messages or kick/ban people',
        permissions: [
            'MANAGE_MESSAGES',
            'KICK_MEMBERS',
            'BAN_MEMBERS'
        ]
    },
    {
        name: 'VOICE_MODERATOR',
        color: '#059669',
        displayName: 'VC Mod',
        description: 'Can manage voice chats',
        permissions: [
            'MOVE_MEMBERS',
            'MUTE_MEMBERS',
            'DEAFEN_MEMBERS'
        ]
    }
];
var unpatch = null;
var tagGradientRenderer = null;
var permissionBits = null;
var computePermissions = null;
var guilds = null;
var channels = null;
var members = null;
function isTagEnabled(name) {
    return STORE.get("tag.".concat(name), true);
}
function resolveColors(tag, guild, user) {
    if (STORE.get('useRoleColor', true) && guild && members) {
        var _members_getMember;
        var member = (_members_getMember = members.getMember) === null || _members_getMember === void 0 ? void 0 : _members_getMember.call(members, guild.id, user === null || user === void 0 ? void 0 : user.id);
        if (member) {
            var appearance = getRoleColorAppearance(member.colorStrings, member.colorString, STORE.get('useEnhancedRoleColors', true));
            if (appearance.colors.length > 0) return appearance;
        }
    }
    return {
        colors: STORE.get('coloredTags', true) ? [
            tag.color
        ] : [],
        style: 'solid'
    };
}
function hasPermission(user, guild, channel, names) {
    if (!guild || !computePermissions || !permissionBits) return false;
    var total;
    try {
        total = computePermissions({
            user: user,
            context: guild,
            overwrites: channel === null || channel === void 0 ? void 0 : channel.permissionOverwrites
        });
    } catch (unused) {
        return false;
    }
    return names.some(function(name) {
        var bit = permissionBits[name];
        return (typeof bit === "undefined" ? "undefined" : _type_of(bit)) === 'bigint' && (total & bit) === bit;
    });
}
function resolveTag(message, user, guild, channel) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = TAGS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var tag = _step.value;
            var _tag_condition;
            if (!isTagEnabled(tag.name)) continue;
            if ((_tag_condition = tag.condition) === null || _tag_condition === void 0 ? void 0 : _tag_condition.call(tag, message, user, guild)) return tag;
            if (!(user === null || user === void 0 ? void 0 : user.bot) && tag.permissions && hasPermission(user, guild, channel, tag.permissions)) {
                return tag;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return null;
}
function MoreUserTagsSettings() {
    var state = STORE.useSettingsStore();
    return /*#__PURE__*/ React.createElement(SettingsScrollView, null, /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Tags"
    }, TAGS.map(function(tag) {
        return /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
            key: tag.name,
            label: tag.displayName,
            description: tag.description,
            value: state.get("tag.".concat(tag.name), true),
            onValueChange: function onValueChange(value) {
                return state.set("tag.".concat(tag.name), value);
            }
        });
    })), /*#__PURE__*/ React.createElement(SettingsSection, {
        title: "Appearance"
    }, /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Coloured Tags",
        description: "Give each tag its own colour instead of the default styling",
        value: state.get('coloredTags', true),
        onValueChange: function onValueChange(value) {
            return state.set('coloredTags', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Use Role Colour",
        description: "Colour tags with the member's role colour where they have one",
        value: state.get('useRoleColor', true),
        onValueChange: function onValueChange(value) {
            return state.set('useRoleColor', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Use Enhanced Role Colours",
        description: "Use gradient and holographic role colours across all generated tags when available",
        value: state.get('useEnhancedRoleColors', true),
        onValueChange: function onValueChange(value) {
            return state.set('useEnhancedRoleColors', value);
        }
    }), /*#__PURE__*/ React.createElement(SettingsSwitchRow, {
        label: "Use Original Poster Tag Style",
        description: "Show staff tags with Discord’s original poster badge styling",
        value: state.get('useOpTagStyle', false),
        onValueChange: function onValueChange(value) {
            return state.set('useOpTagStyle', value);
        }
    })));
}
var index = {
    start: function start(context) {
        var _ref, _ref1;
        var _metro_findByProps, _metro_findByProps1;
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        tagGradientRenderer === null || tagGradientRenderer === void 0 ? void 0 : tagGradientRenderer.stop();
        unpatch = null;
        tagGradientRenderer = null;
        permissionBits = (_ref = (_metro_findByProps = window.unbound.metro.findByProps('Permissions', 'ThemeTypes')) === null || _metro_findByProps === void 0 ? void 0 : _metro_findByProps.Permissions) !== null && _ref !== void 0 ? _ref : null;
        computePermissions = (_ref1 = (_metro_findByProps1 = window.unbound.metro.findByProps('computePermissions', 'canEveryoneRole')) === null || _metro_findByProps1 === void 0 ? void 0 : _metro_findByProps1.computePermissions) !== null && _ref1 !== void 0 ? _ref1 : null;
        guilds = window.unbound.metro.findStore('Guild');
        channels = window.unbound.metro.findStore('Channel');
        members = window.unbound.metro.findStore('GuildMember');
        if (!permissionBits || !computePermissions || !guilds || !channels) return;
        var target = window.unbound.metro.findByName('getTagProperties', {
            interop: false
        });
        if (typeof (target === null || target === void 0 ? void 0 : target.default) !== 'function') return;
        tagGradientRenderer = createTagGradientRenderer(context);
        unpatch = window.unbound.patcher.after(target, 'default', function(ctx) {
            try {
                var _ctx_args_;
                var result = ctx.result;
                if (!result) return;
                var message = (_ctx_args_ = ctx.args[0]) === null || _ctx_args_ === void 0 ? void 0 : _ctx_args_.message;
                var user = message === null || message === void 0 ? void 0 : message.author;
                if (!user) return;
                var channel = channels.getChannel(message.channel_id);
                var guild = (channel === null || channel === void 0 ? void 0 : channel.guild_id) ? guilds.getGuild(channel.guild_id) : null;
                var tag = resolveTag(message, user, guild, channel);
                if (!tag) return;
                var appearance = resolveColors(tag, guild, user);
                var colors = appearance.colors;
                var background = colors[0];
                var processColor = window.unbound.metro.common.ReactNative.processColor;
                var useOpTagStyle = STORE.get('useOpTagStyle', false);
                var tagText = result.opTagText ? "".concat(result.opTagText, " \xb7 ").concat(tag.displayName) : tag.displayName;
                if (useOpTagStyle) {
                    var tagged = _object_spread_props(_object_spread({}, result), {
                        tagText: null,
                        tagAccessibilityLabel: tagText,
                        tagVerified: false,
                        tagTextColor: null,
                        tagBackgroundColor: null,
                        tagType: null,
                        tagIconUrl: null,
                        opTagText: tagText
                    });
                    tagGradientRenderer === null || tagGradientRenderer === void 0 ? void 0 : tagGradientRenderer.setAppearance([
                        tagText
                    ], appearance);
                    if (!background) return tagged;
                    return _object_spread_props(_object_spread({}, tagged), {
                        opTagBackgroundColor: processColor(background),
                        opTagTextColor: processColor(getContrastingTextColor(colors))
                    });
                }
                var tagged1 = _object_spread_props(_object_spread({}, result), {
                    opTagText: null,
                    opTagBackgroundColor: null,
                    opTagTextColor: null,
                    tagText: tagText,
                    tagAccessibilityLabel: tagText,
                    tagVerified: false
                });
                tagGradientRenderer === null || tagGradientRenderer === void 0 ? void 0 : tagGradientRenderer.setAppearance([
                    tagText
                ], appearance);
                if (!background) return tagged1;
                return _object_spread_props(_object_spread({}, tagged1), {
                    tagBackgroundColor: processColor(background),
                    tagTextColor: processColor(getContrastingTextColor(colors))
                });
            } catch (unused) {}
        });
    },
    stop: function stop() {
        unpatch === null || unpatch === void 0 ? void 0 : unpatch();
        tagGradientRenderer === null || tagGradientRenderer === void 0 ? void 0 : tagGradientRenderer.stop();
        unpatch = null;
        tagGradientRenderer = null;
        permissionBits = null;
        computePermissions = null;
        guilds = null;
        channels = null;
        members = null;
    },
    getSettingsPanel: function getSettingsPanel() {
        return /*#__PURE__*/ React.createElement(MoreUserTagsSettings, null);
    }
};
return index;
})();return this.__plugin;},start(context){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.start==='function')return plugin.start(context);},stop(){const module=this.__load();const plugin=module?.default??module;if(plugin&&typeof plugin.stop==='function')return plugin.stop();},getSettingsPanel(...args){const module=this.__load();const plugin=module?.default??module;const settingsPanel=plugin?.getSettingsPanel??module?.getSettingsPanel;if(typeof settingsPanel==='function')return settingsPanel.apply(plugin,args);return null;}})