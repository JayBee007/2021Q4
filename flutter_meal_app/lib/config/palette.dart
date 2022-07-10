import 'package:flutter/material.dart';

// http://mcg.mbitson.com/
class Palette {
  static const MaterialColor palette =
      MaterialColor(_palettePrimaryValue, <int, Color>{
    50: Color(0xFFE1EAF2),
    100: Color(0xFFB4CBDF),
    200: Color(0xFF83A9C9),
    300: Color(0xFF5187B3),
    400: Color(0xFF2B6DA3),
    500: Color(_palettePrimaryValue),
    600: Color(0xFF054C8B),
    700: Color(0xFF044280),
    800: Color(0xFF033976),
    900: Color(0xFF022964),
  });
  static const int _palettePrimaryValue = 0xFF065393;

  static const MaterialColor paletteAccent =
      MaterialColor(_paletteAccentValue, <int, Color>{
    100: Color(0xFF94B6FF),
    200: Color(_paletteAccentValue),
    400: Color(0xFF2E71FF),
    700: Color(0xFF1460FF),
  });
  static const int _paletteAccentValue = 0xFF6194FF;
}
