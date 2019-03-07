//
//  NativeAlert.m
//  myUnicorn
//
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTUtils.h> // using React's Utils to help us find Root View Controller
#import "NativeAlertBridgingHeader.h"

NSHashTable *_alertControllers;

@interface NativeAlert()

@end

@implementation NativeAlert
{
  
}

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (void)invalidate
{
  for (UIAlertController *alertController in _alertControllers) {
    [alertController.presentingViewController dismissViewControllerAnimated:YES completion:nil];
  }
}


RCT_EXPORT_METHOD(openAlert:(NSString *)title
                  :(NSString *)msg)
{
  
  UIViewController *presentingController = RCTPresentedViewController();
  if (presentingController == nil) {
    return;
  }
  
  UIAlertController *alertController = [UIAlertController
                                        alertControllerWithTitle:title
                                        message:msg
                                        preferredStyle:UIAlertControllerStyleAlert];
  
  
  
  [alertController addAction:[UIAlertAction actionWithTitle:@"Ok"
                                                      style:UIAlertActionStyleDefault
                                                    handler:^(__unused UIAlertAction *action) {
                                                      // no actions needed
                                                    }]];

  if (!_alertControllers) {
    _alertControllers = [NSHashTable weakObjectsHashTable];
  }
  [_alertControllers addObject:alertController];
  
  [presentingController presentViewController:alertController animated:YES completion:nil];
}

@end
