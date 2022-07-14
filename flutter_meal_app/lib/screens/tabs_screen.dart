import 'package:flutter/material.dart';

import '../config/palette.dart';
import './categories_screen.dart';
import './favorites_screen.dart';
class TabScreen extends StatefulWidget {
  const TabScreen({Key? key}) : super(key: key);

  @override
  TabScreenState createState() => TabScreenState();
}

class TabScreenState extends State<TabScreen> {
   
   final _tabTitle = [ 'Categories','Favorites' ];
   final _tabs = [ const CategoriesScreen(), const FavoriteScreen()];

  int _selectedTabIndex = 0;

  void _selectTab(int index) {
    setState(() {
      _selectedTabIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title:  Text(_tabTitle[_selectedTabIndex])),
      body: _tabs[_selectedTabIndex],
      bottomNavigationBar: BottomNavigationBar(
        onTap: _selectTab,
        unselectedItemColor: Colors.white,
        selectedItemColor: Palette.paletteAccent.shade700,
        currentIndex: _selectedTabIndex,
        backgroundColor: Theme.of(context).primaryColor
      ,items: const [
        BottomNavigationBarItem(icon: Icon(Icons.category), label: 'Categories'),
        BottomNavigationBarItem(icon: Icon(Icons.star), label: 'Favorites')
      ],)
    );
  }
}
