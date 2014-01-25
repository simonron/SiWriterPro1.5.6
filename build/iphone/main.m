//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"development";
NSString * const TI_APPLICATION_ID = @"com.tortysoft.SiWriterPro";
NSString * const TI_APPLICATION_PUBLISHER = @"Simon Anthony";
NSString * const TI_APPLICATION_URL = @"http://siwriter.co.uk";
NSString * const TI_APPLICATION_NAME = @"SiWriterPro";
NSString * const TI_APPLICATION_VERSION = @"1.0.0.1";
NSString * const TI_APPLICATION_DESCRIPTION = @"Pro version of SiWriter: a text input, note taking app for the iPad/iPad mini, based on the one handed chording keyboard Microwriting codes as used in the CyKey and AgendA. With configurable finger pad layout and multiple productivity features.";
NSString * const TI_APPLICATION_COPYRIGHT = @"2014  Tortoisesoft Enterprises";
NSString * const TI_APPLICATION_GUID = @"c55cf289-8cf3-412b-bf67-0cbb9c09ffaf";
BOOL const TI_APPLICATION_ANALYTICS = true;

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
