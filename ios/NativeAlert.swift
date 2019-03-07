//
//  NativeAlert.swift
//  myUnicorn
//
//  Not Currently in Use
//

import Foundation
import UIKit

@objc(NativeAlertSwift)
open class NativeAlertSwift: UIViewController {
  
  @objc open func openAlert(_ msg: String) {
    let alert = UIAlertController(title: "Alert", message: msg, preferredStyle: .alert)
    alert.addAction(UIAlertAction(title: "OK", style: .default))
    self.present(alert, animated: true, completion: nil) // using self.present states error: whose view is not in the window hierarchy
  }
  
}
