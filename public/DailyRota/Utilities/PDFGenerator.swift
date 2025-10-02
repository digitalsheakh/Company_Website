//
//  PDFGenerator.swift
//  Daily Rota
//
//  Created for Daily Rota app
//

import Foundation
import UIKit
import PDFKit

class PDFGenerator {
    
    func generateRotaPDF(rota: Rota, workers: [User]) -> Data? {
        // Create a new PDF document
        let pdfMetaData = [
            kCGPDFContextCreator: "Daily Rota App",
            kCGPDFContextAuthor: "Daily Rota",
            kCGPDFContextTitle: rota.title
        ]
        let format = UIGraphicsPDFRendererFormat()
        format.documentInfo = pdfMetaData as [String: Any]
        
        let pageWidth = 8.5 * 72.0
        let pageHeight = 11 * 72.0
        let pageRect = CGRect(x: 0, y: 0, width: pageWidth, height: pageHeight)
        
        let renderer = UIGraphicsPDFRenderer(bounds: pageRect, format: format)
        
        let data = renderer.pdfData { (context) in
            context.beginPage()
            
            // Add logo and header
            addHeader(pageRect: pageRect, title: rota.title)
            
            // Add date range
            let dateFormatter = DateFormatter()
            dateFormatter.dateStyle = .medium
            let dateRange = "Period: \(dateFormatter.string(from: rota.startDate)) - \(dateFormatter.string(from: rota.endDate))"
            addText(text: dateRange, pageRect: pageRect, textTop: 120)
            
            // Add rota details
            var yPosition: CGFloat = 160
            
            // Create a dictionary to map worker IDs to names
            var workerNames: [String: String] = [:]
            for worker in workers {
                if let id = worker.id {
                    workerNames[id] = worker.name
                }
            }
            
            // Group shifts by date
            var shiftsByDate: [Date: [(workerId: String, shift: Rota.Assignment.Shift)]] = [:]
            
            for assignment in rota.assignments {
                for shift in assignment.shifts {
                    let calendar = Calendar.current
                    let dateComponents = calendar.dateComponents([.year, .month, .day], from: shift.date)
                    if let date = calendar.date(from: dateComponents) {
                        if shiftsByDate[date] == nil {
                            shiftsByDate[date] = []
                        }
                        shiftsByDate[date]?.append((workerId: assignment.workerId, shift: shift))
                    }
                }
            }
            
            // Sort dates
            let sortedDates = shiftsByDate.keys.sorted()
            
            // Format for time
            let timeFormatter = DateFormatter()
            timeFormatter.timeStyle = .short
            
            // Draw shifts by date
            for date in sortedDates {
                dateFormatter.dateStyle = .full
                let dateString = dateFormatter.string(from: date)
                
                addText(text: dateString, pageRect: pageRect, textTop: yPosition, fontSize: 14, isBold: true)
                yPosition += 25
                
                if let shifts = shiftsByDate[date] {
                    for (workerId, shift) in shifts {
                        let workerName = workerNames[workerId] ?? "Unknown Worker"
                        let timeRange = "\(timeFormatter.string(from: shift.startTime)) - \(timeFormatter.string(from: shift.endTime))"
                        let location = shift.location ?? "Main Location"
                        
                        let shiftText = "• \(workerName): \(timeRange) at \(location)"
                        addText(text: shiftText, pageRect: pageRect, textTop: yPosition)
                        yPosition += 20
                        
                        if let notes = shift.notes, !notes.isEmpty {
                            addText(text: "  Notes: \(notes)", pageRect: pageRect, textTop: yPosition, fontSize: 10, textColor: UIColor.darkGray)
                            yPosition += 15
                        }
                    }
                }
                
                yPosition += 15
                
                // Check if we need a new page
                if yPosition > pageHeight - 100 {
                    context.beginPage()
                    yPosition = 50
                }
            }
            
            // Add notes if any
            if let notes = rota.notes, !notes.isEmpty {
                yPosition += 10
                addText(text: "General Notes:", pageRect: pageRect, textTop: yPosition, fontSize: 14, isBold: true)
                yPosition += 25
                addText(text: notes, pageRect: pageRect, textTop: yPosition)
            }
            
            // Add footer
            addFooter(pageRect: pageRect)
        }
        
        return data
    }
    
    private func addHeader(pageRect: CGRect, title: String) {
        let titleFont = UIFont.boldSystemFont(ofSize: 24.0)
        let titleAttributes: [NSAttributedString.Key: Any] = [
            .font: titleFont,
            .foregroundColor: UIColor.black
        ]
        
        let attributedTitle = NSAttributedString(string: title, attributes: titleAttributes)
        let titleStringSize = attributedTitle.size()
        let titleStringRect = CGRect(x: (pageRect.width - titleStringSize.width) / 2.0,
                                    y: 50,
                                    width: titleStringSize.width,
                                    height: titleStringSize.height)
        attributedTitle.draw(in: titleStringRect)
        
        // Add app name
        let appNameFont = UIFont.systemFont(ofSize: 12.0)
        let appNameAttributes: [NSAttributedString.Key: Any] = [
            .font: appNameFont,
            .foregroundColor: UIColor.darkGray
        ]
        
        let attributedAppName = NSAttributedString(string: "Generated by Daily Rota App", attributes: appNameAttributes)
        let appNameStringSize = attributedAppName.size()
        let appNameStringRect = CGRect(x: (pageRect.width - appNameStringSize.width) / 2.0,
                                      y: 80,
                                      width: appNameStringSize.width,
                                      height: appNameStringSize.height)
        attributedAppName.draw(in: appNameStringRect)
        
        // Add horizontal line
        let path = UIBezierPath()
        path.move(to: CGPoint(x: 40, y: 100))
        path.addLine(to: CGPoint(x: pageRect.width - 40, y: 100))
        path.lineWidth = 1.0
        UIColor.lightGray.setStroke()
        path.stroke()
    }
    
    private func addText(text: String, pageRect: CGRect, textTop: CGFloat, fontSize: CGFloat = 12.0, isBold: Bool = false, textColor: UIColor = UIColor.black) {
        let font = isBold ? UIFont.boldSystemFont(ofSize: fontSize) : UIFont.systemFont(ofSize: fontSize)
        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = .left
        paragraphStyle.lineBreakMode = .byWordWrapping
        
        let textAttributes: [NSAttributedString.Key: Any] = [
            .font: font,
            .foregroundColor: textColor,
            .paragraphStyle: paragraphStyle
        ]
        
        let attributedText = NSAttributedString(string: text, attributes: textAttributes)
        let textRect = CGRect(x: 40, y: textTop, width: pageRect.width - 80, height: 50)
        attributedText.draw(in: textRect)
    }
    
    private func addFooter(pageRect: CGRect) {
        let dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .medium
        dateFormatter.timeStyle = .short
        let dateString = "Generated on \(dateFormatter.string(from: Date()))"
        
        let font = UIFont.systemFont(ofSize: 10.0)
        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = .center
        
        let textAttributes: [NSAttributedString.Key: Any] = [
            .font: font,
            .foregroundColor: UIColor.darkGray,
            .paragraphStyle: paragraphStyle
        ]
        
        let attributedText = NSAttributedString(string: dateString, attributes: textAttributes)
        let textRect = CGRect(x: 40, y: pageRect.height - 40, width: pageRect.width - 80, height: 30)
        attributedText.draw(in: textRect)
    }
} 