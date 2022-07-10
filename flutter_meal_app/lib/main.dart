import 'package:flutter/material.dart';

import './config/palette.dart';
import './screens/categories_screen.dart';

void main() => runApp(const MealApp());

class MealApp extends StatelessWidget {
  const MealApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Meals',
      theme: ThemeData(
        primarySwatch: Palette.palette,
        colorScheme: ColorScheme.fromSwatch().copyWith(
          secondary: Palette.paletteAccent, // Your accent color
        ),
        canvasColor:  const Color.fromARGB(222, 255, 252, 252),
        fontFamily: 'Raleway',
        textTheme: ThemeData.light().textTheme.copyWith(
          bodyText1: const TextStyle(color: Color.fromRGBO(20, 51, 51, 1)),
          bodyText2: const TextStyle(color: Color.fromRGBO(20, 51, 51, 1)),
          headline6: const TextStyle(
            fontSize: 20,
            fontFamily: 'RobotoCondensed',
            fontWeight: FontWeight.bold
          )
        )
      ),
      home: CategoriesScreen(key: key),
    );
  }
}
